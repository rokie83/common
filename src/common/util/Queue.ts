export interface QueueItem {
    callback: Function;
    data: any;
}

export class Queue {
    private queue: QueueItem[] = [];

    public push(item: QueueItem): number {
        return this.queue.push(item);
    }

    public pop(): QueueItem {
        return this.queue.pop();
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    public empty(callback: Function): void {
        while (!this.isEmpty()) {
            const item = this.pop();
            callback(item);
        }
    }
}
