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
        private readonly IProductBrandRepository _repo;

        public ProductBrandController(IProductBrandRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            var brands = await _repo.GetProductBrandsAsync();
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async
            Task<ActionResult<ProductBrand>> GetProductBrand(int id)
        {
            return await _repo.GetProductBrandByIdAsync(id);
        }
    }
}
