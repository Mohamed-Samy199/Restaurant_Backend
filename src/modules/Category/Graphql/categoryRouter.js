import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { allCategory, allCategoryWithPaginstion, getCategoryById } from "./categoryController.js";
import { categoryType } from "./category.types.js";

const allCategoryListType = new GraphQLObjectType({
    name: "categories",
    description: "get all categories",
    fields: {
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        data: { type: new GraphQLList(categoryType) }
    }
});

const allCategoryPaginationListType = new GraphQLObjectType({
    name: "categoriesPagination",
    description: "get all categories with pagination",
    fields: {
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        totalCount: { type: GraphQLInt },
        data: { type: new GraphQLList(categoryType) }
    }
});

const oneCategoryType = new GraphQLObjectType({
    name: "oneCategory",
    description: "get one category by id",
    fields: {
        message: { type: GraphQLString },
        status: { type: GraphQLInt },
        data: { type: categoryType }
    }
});


export const query = {
    //List of Category 
    categories: {
        type: allCategoryListType,
        resolve: allCategory
    },
    //List of Category with pagination
    categoriesByPagination: {
        type: allCategoryPaginationListType,
        args: {
            page: { type: GraphQLInt },
            limit: { type: GraphQLInt }
        },
        resolve: allCategoryWithPaginstion
    },
    //One Category
    getCategoryById: {
        type: oneCategoryType,
        args: { id: { type: GraphQLID } },
        resolve: getCategoryById
    }
}

