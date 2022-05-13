const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

/*
const movies = [
    { "name": "PF", "genre": "Crime", "directorId":"627dfc494b7a23952954048b"},
    {"name": 'Inception', "genre": "Fantastic", "directorId":"627dff294b7a23952954048d" },
    {"name": "Interstellar", "genre": "Sci-Fi", "directorId":"627dff294b7a23952954048d" },
    {"name": "Tenet", "genre": "Fantastxic", "directorId":"627dff294b7a23952954048d" },
    {"name": "Interstellar1", "genre": "Sci-Fi", "directorId":"627dff564b7a23952954048f" },
    { "name": "Tenet", "genre": "Fantastxic", "directorId":"627dff564b7a23952954048f" },
    { "name": "Te2net", "genre": "F11111antastxic", "directorId":"dff564b7a23952954048f" }

];

const directors = [
    {"name": "Quentin Tarantino", "age": 122},//627dfc494b7a23952954048b
    { "name": "Christopher Nolan", "age": 22},
    { "name": 'Gay Richy', "age": 22}627dff564b7a23952954048f
];
*/

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return directors.find(director => director.id == parent.id);
            }
        }
    }),
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.filter(movie => movie.directorId === parent.id);
            },

        }
    }),
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return movies.find(movie => movie.id == args.id);
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id == args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors;
            }
        },
    }
});

module.exports = new GraphQLSchema({query: Query,});
