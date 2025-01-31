class StringArrayMap{
    constructor(){
        this.map = new Map();
    }

    addElement(key,value){
        if(!this.map.has(key)){
            this.map.set(key,[]);
        }
        this.map.get(key).push(value);
    }

    removeElement(key, element) {
        if (this.map.has(key)) {
            let arr = this.map.get(key);
            this.map.set(key, arr.filter(item => item.id !== element)); // Remove the element

            // If the array becomes empty, remove the key from the map
            if (this.map.get(key).length === 0) {
                this.map.delete(key);
            }
        }
    }

    getMap(){
        return this.map;
    }

    getUsers(key){
        return this.map.get(key);
    }

    printMap() {
        console.log("Current Map:", Object.fromEntries(this.map));
    }

}

module.exports = StringArrayMap;