
export class DataSource {
    constructor(
        public name: string,
        public type: string,
        public description: string,
        public columns: any[],
        public data: any[]
    ) { }

    public paginator(start:number,end:number): any {
        return this.data.slice(start, end);
    }

    public sort(column:string,order:string): any {
        return this.data.sort((a:any,b:any) => {
            if(a[column] < b[column]) { return -1; }
            if(a[column] > b[column]) { return 1; }
            return 0;
        });
    }

    public filter(column:string,filter:string): any {
        return this.data.filter((a:any) => {
            return a[column].includes(filter);
        });
    }

    public search(search:string): any {
        return this.data.filter((a:any) => {
            return a.name.includes(search);
        });
    }

}
