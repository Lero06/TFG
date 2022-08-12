export interface Evento {
    id:string,
    nombre:string,
    descripcion:string,
    fecha?:Date, // A cambiar el ?
    
    // Puede que la portada no tenga foto
    portadaImgPath?:string

}