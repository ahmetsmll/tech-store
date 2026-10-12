package com.techstore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class CreateOrderRequest {
    @NotEmpty(message = "Sipariş en az bir ürün içermelidir")
    private List<OrderItemRequest> items;

    @NotBlank(message = "Teslimat adresi zorunludur")
    private String shippingAddress;

    private String paymentMethod = "CREDIT_CARD";

    public CreateOrderRequest() {}

    public CreateOrderRequest(List<OrderItemRequest> items, String shippingAddress, String paymentMethod) {
        this.items = items;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
    }

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
