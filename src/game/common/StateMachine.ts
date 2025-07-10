export abstract class StateMachine<T extends JetpackJoyride.IState>
    implements JetpackJoyride.IStateMachine<T>
{
    public currentState: T | null = null;
    public states: { [key: string]: T } = {};

    constructor() {}

    public switchState(key: string): void {
        const newState = this.states[key];

        if (!newState) {
            console.warn(`State '${key}' not found in state machine`);
            return;
        }

        if (this.currentState === newState) {
            return; // Already in this state
        }

        // Exit current state
        if (this.currentState) {
            this.currentState.onExit();
        }

        // Switch to new state
        this.currentState = newState;
        this.currentState.onEnter();

        this.onStateChanged(key);
    }

    public update(time: number, delta: number): void {
        if (this.currentState) {
            this.currentState.onUpdate(time, delta);
        }
    }

    public addState(key: string, state: T): void {
        this.states[key] = state;
    }

    public removeState(key: string): void {
        if (this.states[key]) {
            // If removing current state, exit it first
            if (this.currentState === this.states[key]) {
                this.currentState.onExit();
                this.currentState = null;
            }
            delete this.states[key];
        }
    }

    public hasState(key: string): boolean {
        return key in this.states;
    }

    public getCurrentStateName(): string | null {
        if (!this.currentState) return null;

        for (const [key, state] of Object.entries(this.states)) {
            if (state === this.currentState) {
                return key;
            }
        }
        return null;
    }

    // Hook for subclasses to override
    protected onStateChanged(_newStateName: string): void {
        // Override in subclasses if needed
    }

    // Helper method to get all state names
    public getStateNames(): string[] {
        return Object.keys(this.states);
    }

    // Helper method to force exit current state without entering new one
    public exitCurrentState(): void {
        if (this.currentState) {
            this.currentState.onExit();
            this.currentState = null;
        }
    }
}
