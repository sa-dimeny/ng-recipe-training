import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // new Recipe(
        //     'Soft Polenta with Fruit and Nuts',
        //     'A tasty polenta from fruits, nuts and almond milk.',
        //     'https://www.motherearthstorehouse.com/portals/1/HealthyLiving/Recipes/Breakfast/SoftPolentaFruitNuts.jpg',
        //     [
        //         new Ingredient('Almond Milk', 1),
        //         new Ingredient('Banana', 1),
        //         new Ingredient('Nuts', 2),
        //         new Ingredient('Strawberry', 4)
        //     ]),
        // new Recipe(
        //     'Strawberry Banana Pancakes',
        //     'Fluffy pancakes with banana and strawberry.',
        //     'https://www.motherearthstorehouse.com/portals/1/HealthyLiving/Recipes/Breakfast/StrawberryBananaPancakes.jpg',
        //     [
        //         new Ingredient('Eggs', 3),
        //         new Ingredient('Banana', 2),
        //         new Ingredient('Milk', 1),
        //         new Ingredient('Strawberry', 6),
        //         new Ingredient('Flour', 1)
        //     ])
    ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      console.log(this.recipes);

      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addRecipeIngredientsToSL(recipeIngredients: Ingredient[]) {
        this.slService.addIngredients(recipeIngredients);
    }

    getRecipe(id: number) {
        return this.recipes.slice()[id]
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
