export interface Libro {
    id:string,
    titulo:string,
    autor:string,
    isbn:string,
    editorial?:string,
    edicion?:string,
    categoria:string,
    tipo:string,
    idioma:string,

    paginas?:number,

    // Puede que la portada no tenga foto
    portadaImgPath?:string

    // Si está disponible, habrá un propietario y una fecha de renovación

    disponible:boolean,
    propietarioActual?:string,
    fechaRenovacion?:string,
    // Posibles estados {pedido, enCamino, listo}
    estado?:string,

    // En todos los casos habrá una ubicacion para ver a donde se va a devolver el libro
    ubicacion?:string

}