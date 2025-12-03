"use strict";
//
//
//                  draw a processBar base on input of total iteration
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessBar = void 0;
class ProcessBar {
    constructor(total, title, lineLength = 40, showLine = true) {
        this.total = total;
        this.title = title;
        this.lineLength = lineLength;
        this.showLine = showLine;
        this.completed = 0;
        this.line = 0;
        this.lineStep = 0;
        this.cursorStart = 30;
        this.startTime = 0;
        this.etaSmoothed = null; // Persistent across calls
        this.lineStep = 100 / this.lineLength;
        this.startTime = Date.now();
        if (!showLine) {
            this.cursorStart = 70;
            this.lineLength = 0;
            this.title = undefined;
            this.startPoint();
            this.plotRate(0, '');
        }
        else {
            this.startPoint();
            this.plotRemaining();
            this.plotRate(0, '');
        }
    }
    next() {
        this.completed += 1;
        let success = Number(((this.completed / this.total) * 100).toFixed(2));
        let bar = Number(((this.completed / this.total) * 100).toFixed(0));
        let dif = Number((bar / this.lineStep).toFixed(1)) - this.line;
        if (dif >= 1) {
            dif = Math.round(dif);
            this.line += dif;
            if (this.line > this.lineLength)
                this.line = this.lineLength;
            this.plotBar();
        }
        this.plotRate(success, this.calculateEta());
    }
    calculateEta() {
        if (!this.startTime || this.completed === 0 || this.total <= this.completed) {
            return 'ETA: Calculating...';
        }
        const elapsedTime = Date.now() - this.startTime;
        const remaining = this.total - this.completed;
        const avgTimePerUnit = elapsedTime / this.completed;
        const estimatedRemainingTime = avgTimePerUnit * remaining;
        // Apply exponential smoothing
        const alpha = 0.2;
        if (this.etaSmoothed === null) {
            this.etaSmoothed = estimatedRemainingTime;
        }
        else {
            this.etaSmoothed = alpha * estimatedRemainingTime + (1 - alpha) * this.etaSmoothed;
        }
        const totalSeconds = Math.max(0, Math.round(this.etaSmoothed / 1000));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const formatted = (hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '') +
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}`;
        return `ETA: ${formatted}`;
    }
    plotTitle() {
        if (this.title) {
            let t = this.title;
            if (this.title.length > 20) {
                t = this.title.slice(0, 20) + '...';
            }
            this.idlePoint();
            process.stdout.write(' ==> ' + t);
        }
    }
    plotBar() {
        if (this.showLine) {
            this.startPoint();
            this.clearAll();
            this.plotComplete();
            this.plotRemaining();
        }
    }
    plotRemaining() {
        for (let i = this.line; i < this.lineLength; i++) {
            process.stdout.write('░');
        }
    }
    plotComplete() {
        for (let i = 0; i < this.line; i++) {
            process.stdout.write('▓');
        }
    }
    startPoint() {
        process.stdout.cursorTo(this.cursorStart);
    }
    cursorToEndBar() {
        let end = this.lineLength + this.cursorStart + 1;
        process.stdout.cursorTo(end);
    }
    cursorToEndText(text) {
        this.cursorToEndBar();
        process.stdout.moveCursor(15, 0);
        process.stdout.write(text);
    }
    idlePoint() {
        process.stdout.cursorTo(0);
    }
    clearAll() {
        if (this.showLine) {
            process.stdout.clearLine(0);
        }
        else {
            process.stdout.cursorTo(this.cursorStart);
            this.clearRight();
        }
    }
    clearRight() {
        process.stdout.clearLine(1);
    }
    plotRate(success, eta) {
        let s = success > 100 ? 100 : success;
        this.plotTitle();
        this.cursorToEndBar();
        this.clearRight();
        process.stdout.write(`   ${s} %`);
        this.cursorToEndText(eta);
        this.idlePoint();
    }
    finish() {
        let s = 100;
        this.plotTitle();
        this.startPoint();
        for (let i = 0; i < this.lineLength; i++) {
            process.stdout.write('▓');
        }
        this.cursorToEndBar();
        this.clearRight();
        process.stdout.write(`   ${s} %`);
        this.cursorToEndText('Finished');
        this.idlePoint();
        process.stdout.write('\n');
    }
}
exports.ProcessBar = ProcessBar;
