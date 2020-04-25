using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductTypeRepository : IGenericRepository<ProductType>
    {
        private readonly StoreContext _context;

        public ProductTypeRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<ProductType> GetByIdAsync(int id)
        {
            return await _context.ProductTypes.FindAsync(id);
        }

        public async Task<IReadOnlyList<ProductType>> ListAllAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }
    }
}
