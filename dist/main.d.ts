export declare class ProcessBar {
    private total;
    private title?;
    private lineLength;
    private showLine;
    private completed;
    private line;
    private lineStep;
    private cursorStart;
    private startTime;
    private etaSmoothed;
    constructor(total: number, title?: string | undefined, lineLength?: number, showLine?: boolean);
    next(): void;
    private calculateEta;
    private plotTitle;
    private plotBar;
    private plotRemaining;
    private plotComplete;
    private startPoint;
    private cursorToEndBar;
    private cursorToEndText;
    private idlePoint;
    private clearAll;
    private clearRight;
    private plotRate;
    finish(): void;
}
