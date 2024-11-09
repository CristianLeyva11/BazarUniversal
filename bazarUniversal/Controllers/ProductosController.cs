using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bazarUniversal.Models;

namespace bazarUniversal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class ProductosController : ControllerBase
    {
        private readonly ProyectoContext _context;

        public ProductosController(ProyectoContext context)
        {
            _context = context;
        }

        // 1. Obtener todos los productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetAllProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        // 2. Obtener un producto por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProductoById(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }
            return producto;
        }

       [HttpGet("buscar/{palabra}")]
    public async Task<ActionResult<IEnumerable<Producto>>> BuscarProductos(string palabra)
    {
        var productos = await _context.Productos
            .Where(p => p.Titulo.Contains(palabra) || p.Descripcion.Contains(palabra))
            .ToListAsync();

        if (productos == null || !productos.Any())
        {
            return NotFound("No se encontraron productos que coincidan con la búsqueda.");
        }

        return productos;
    }
    }
}
