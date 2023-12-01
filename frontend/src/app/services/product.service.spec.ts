import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from storage on initialization', () => {
    const retrieveProductsSpy = spyOn(service as any, 'retrieveProductsFromStorage').and.callThrough();
    service = new ProductService(TestBed.inject(HttpClient)); 
    expect(retrieveProductsSpy).toHaveBeenCalled();
  });

  it('should update storage when adding a product to the local list', () => {
    const updateStorageSpy = spyOn(service as any, 'updateStorage').and.callThrough();
    const mockProduct = { productId: '1', name: 'Product 1' };
    
    service.addProductToLocalList(mockProduct);

    expect(updateStorageSpy).toHaveBeenCalled();
  });

  it('should remove product from local list when calling removeProductFromLocalList', () => {
    const updateStorageSpy = spyOn(service as any, 'updateStorage').and.callThrough();
    const mockProductId = '1';
    
    service.removeProductFromLocalList(mockProductId);

    expect(updateStorageSpy).toHaveBeenCalled();
  });

  it('should make a DELETE request when calling deleteProduct', () => {
    const mockProductId = '1';

    service.deleteProduct(mockProductId).subscribe();

    const req = httpTestingController.expectOne(`${service['apiUrl']}/${mockProductId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should make a GET request when calling getAllProducts', () => {
    const mockProducts = [{ productId: '1', name: 'Product 1' }];
    
    service.getAllProducts().then(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('http://localhost:8000/product/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should make a POST request when calling createProduct', () => {
    const mockProductData = { name: 'Product 1' };

    service.createProduct(mockProductData).subscribe();

    const req = httpTestingController.expectOne(`${service['apiUrl']}/create`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

