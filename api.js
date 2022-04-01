class API {
    constructor() {
        this.productos = []
    }

    add(new_product) {
        let new_id = (() => {
            let max_id = 0
            this.productos.forEach(producto => {
                if (producto.id > max_id) max_id = producto.id
            });
            return max_id + 1
        })();
        this.productos.push({ title: new_product.title, price: new_product.price, thumbnail: new_product.thumbnail, id: new_id })
        return new_id
    }

    getById(id) {
        let objeto = { error: 'producto no encontrado' }
        this.productos.forEach(producto => {
            if (producto.id === id) {
                objeto = producto
            }
        });
        return objeto
    }

    getAll() {
        return this.productos;
    }

    deleteById(id) {
        let leng_origin = this.productos.length;
        this.productos = this.productos.filter((producto) => producto.id !== id)
        if (this.productos.length == leng_origin) return { error: 'producto no encontrado' }
        return { success: 'producto borrado' }
    }

    updateById(id, data) {
        let respuesta = { error: 'producto no encontrado' }
        this.productos.forEach(producto => {
            if (producto.id === id) {
                producto.title = data.title
                producto.price = data.price
                producto.thumbnail = data.thumbnail
                respuesta = { success: 'producto modificado' }
            }
        });
        return respuesta
    }
}
module.exports = API