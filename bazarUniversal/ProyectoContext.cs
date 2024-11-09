using Microsoft.EntityFrameworkCore;
using bazarUniversal.Models;

namespace bazarUniversal
{
    public class ProyectoContext : DbContext
    {
        public ProyectoContext(DbContextOptions<ProyectoContext> options) : base(options) { }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Venta> Ventas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración para la tabla "Producto"
            modelBuilder.Entity<Producto>(producto =>
            {
                producto.ToTable("productos");
                producto.HasKey(p => p.Id);
                producto.Property(p => p.Id)
                    .ValueGeneratedOnAdd();
            });

            // Configuración para la tabla "Venta"
            modelBuilder.Entity<Venta>(venta =>
            {
                venta.ToTable("venta");
                venta.HasKey(v => v.Id);
                venta.Property(v => v.Id)
                    .ValueGeneratedOnAdd();

                venta.HasOne(v => v.Producto)
                    .WithMany()
                    .HasForeignKey(v => v.IdProducto)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
