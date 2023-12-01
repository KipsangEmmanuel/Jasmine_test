import { TestBed } from '@angular/core/testing';
import { ProductSharedService } from './product-shared.service';

describe('ProductSharedService', () => {
  let service: ProductSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial empty product list', () => {
    service.productList$.subscribe(products => {
      expect(products).toEqual([]);
    });
  });

  it('should update product list when calling updateProductList', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    service.updateProductList(mockProducts);

    service.productList$.subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
  });
});
