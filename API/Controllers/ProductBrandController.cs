using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/products/brands")]
    public class ProductBrandController : ControllerBase
    {
        private readonly IGenericRepository<ProductBrand> _repo;

        public ProductBrandController(IGenericRepository<ProductBrand> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            var brands = await _repo.ListAllAsync();
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async
            Task<ActionResult<ProductBrand>> GetProductBrand(int id)
        {
            return await _repo.GetByIdAsync(id);
        }
    }
}
