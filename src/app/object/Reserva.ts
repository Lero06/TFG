export interface Reserva {
    id:string,
    isbn:string;

    /* Los estados pueden ser: 
        - enBiblioteca -> si está en la presente biblioteca y por tanto se puede reservar
        - enOtraBiblioteca -> si está en la otra biblioteca y por tanto se debe pedir para traer
        - conOtroLector -> se deberá esperar que este lector develva el libro, no lo podrá renovar
        - pedido(reservado) -> se ha pedido el libro, otro lector lo posee, se deberá esperar que este lector develva el libro
        - pedido(enTransporte) -> se ha pedido el libro, estaba en otra biblioteca, está viniendo a la presente
        - pedido(listoParaRecoger) -> se ha pedido el libro, está en la biblioteca, listo para recoger
    */
   
    estado:string;
    localizacion:string;

    fechaIni?:Date;
    fechaFin?:Date;
    vecesRenovado?:number;
    lector?:string;

}