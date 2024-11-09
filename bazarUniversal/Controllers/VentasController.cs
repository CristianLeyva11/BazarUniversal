using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bazarUniversal.Models;

namespace bazarUniversal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly ProyectoContext _context;

        public VentasController(ProyectoContext context)
        {
            _context = context;
        }
        [HttpPost("registrar")]
        public async Task<ActionResult<Venta>> RegistrarVenta([FromBody] Venta venta)
        {
            try
            {
                var producto = await _context.Productos.FindAsync(venta.IdProducto);
                if (producto == null)
                {
                    return NotFound("Producto no encontrado");
                }

                venta.Total = producto.Precio * venta.Cantidad;
                venta.Fecha = DateTime.Now;
                _context.Ventas.Add(venta);
                await _context.SaveChangesAsync();

                return Ok(venta);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al registrar la venta: {ex.Message}");
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venta>>> GetAllVentas()
        {
            return await _context.Ventas
                .Include(v => v.Producto)
                .ToListAsync();
        }
    }
}
