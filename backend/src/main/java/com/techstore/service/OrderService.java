package com.techstore.service;

import com.techstore.dto.CreateOrderRequest;
import com.techstore.dto.OrderItemRequest;
import com.techstore.entity.Order;
import com.techstore.entity.OrderItem;
import com.techstore.entity.Product;
import com.techstore.entity.User;
import com.techstore.repository.OrderRepository;
import com.techstore.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        AuthService authService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.authService = authService;
    }

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        User user = authService.getCurrentUser();

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus("PROCESSING");

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Ürün bulunamadı: " + itemReq.getProductId()));

            BigDecimal itemPrice = (product.getDiscountPrice() != null && product.getDiscountPrice().compareTo(BigDecimal.ZERO) > 0)
                    ? product.getDiscountPrice()
                    : product.getPrice();

            BigDecimal lineTotal = itemPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            total = total.add(lineTotal);

            OrderItem orderItem = new OrderItem(order, product, itemReq.getQuantity(), itemPrice);
            order.getItems().add(orderItem);

            // Stok güncellemesi
            if (product.getStock() >= itemReq.getQuantity()) {
                product.setStock(product.getStock() - itemReq.getQuantity());
                productRepository.save(product);
            }
        }

        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    public List<Order> getUserOrders() {
        User user = authService.getCurrentUser();
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sipariş bulunamadı: " + id));
    }
}
