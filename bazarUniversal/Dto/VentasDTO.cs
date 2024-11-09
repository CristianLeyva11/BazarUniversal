namespace bazarUniversal.Dto
{
    public class VentasDTO
    {
        public int Id { get; set; }
        public int IdProducto { get; set; }
        public DateTime Fecha { get; set; }
        public int Cantidad { get; set; }
        public decimal Total { get; set; }

        public string? ProductoTitulo { get; set; }    }
}
