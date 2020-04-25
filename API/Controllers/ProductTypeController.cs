using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/products/types")]
    public class ProductTypeController : ControllerBase
    {
        private readonly IGenericRepository<ProductType> _repo;

        public ProductTypeController(IGenericRepository<ProductType> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {
            var types = await _repo.ListAllAsync();
            return Ok(types);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductType>> GetProductType(int id)
        {
            return await _repo.GetByIdAsync(id);
        }
    }
}
