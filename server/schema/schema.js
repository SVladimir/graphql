const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const movies = [
    {id: '1', name: 'PF', genre: 'Crime', directorId: '1'},
    {id: '2', name: 'Inception', genre: 'Fantastic', directorId: '2'},
    {id: 3, name: 'Interstellar', genre: 'Sci-Fi', directorId: '2'},
    {id: 4, name: 'Tenet', genre: 'Fantastxic', directorId: '2'},
    {id: 5, name: 'Interstellar1', genre: 'Sci-Fi', directorId: '3'},
    {id: 6, name: 'Tenet', genre: 'Fantastxic', directorId: '3'}
];

const directors = [
    {id: '1', name: 'Quentin Tarantino', age: 122},
    {id: '2', name: 'Christopher Nolan', age: 22},
    {id: '3', name: 'Gay Richy', age: 22}
];

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
