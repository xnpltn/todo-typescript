import Listitem from "./Listitem";


interface List {
    list: Listitem[]
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: Listitem): void,
    removeItem(id: string): void
}

export default class FullList implements List{
    static instance: FullList = new FullList()
    private constructor(
        private _list: Listitem[] = [],

    ){}

    get list(): Listitem[]{
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem('mylist')
        if (typeof storedList !== 'string') return

        const persedList: {
            _id: string,
            _item: string,
            _checked: boolean

        }[] = JSON.parse(storedList)


        persedList.forEach(itemObj =>{
            const newListItem = new Listitem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        } )
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save
    }

    addItem(itemObj: Listitem): void {
        this._list.push(itemObj),
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }

}