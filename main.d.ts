// ProcessBar.d.ts

export declare class ProcessBar {
    private compeled;
    private line;
    private lineStep;
    private cursorStart;
    private startTime;
  
    constructor(
      total: number,
      title?: string,
      lineLength?: number,
      showLine?: boolean
    );
  
    next(): void;
    finish(): void;
  
    private calEta(): string;
    private plotTitle(): void;
    private plotBar(): void;
    private plotRemaining(): void;
    private plotComplete(): void;
    private startPoint(): void;
    private cursorToEndBar(): void;
    private cursorToEndText(text: string): void;
    private idlePoint(): void;
    private clearAll(): void;
    private clearRight(): void;
    private plotRate(success: number, eta: string): void;
  }
  