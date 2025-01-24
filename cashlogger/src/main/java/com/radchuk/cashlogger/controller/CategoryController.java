package com.radchuk.cashlogger.controller;

import com.radchuk.cashlogger.domain.Category;
import com.radchuk.cashlogger.domain.request.CategoryRequest;
import com.radchuk.cashlogger.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Content;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = "api/v1/categories")
@Tag(name = "Category", description = "API for managing categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @Operation(
            summary = "Create category",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Category created",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Category.class)
                            )
                    )
            }
    )
    public Category createCategory(
            @RequestBody CategoryRequest categoryRequest) {
        return categoryService.saveCategory(categoryRequest);
    }

    @GetMapping
    @Operation(
            summary = "Get all categories",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Categories retrieved",
                            content = @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = Category.class))
                            )
                    )
            }
    )
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get category by id",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Category retrieved",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Category.class)
                            )
                    )
            }
    )
    public Category getCategoryById(
            @PathVariable("id") Long categoryId) {
        return categoryService.getCategoryById(categoryId);
    }

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Delete category by id",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Category deleted"
                    )
            }
    )
    public void deleteCategory(
            @PathVariable("id") Long categoryId) {
        categoryService.deleteCategoryById(categoryId);
    }
}