const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const universities = [
    {
        "id": 1,
        "name": "Alabama A & M University",
        "city": {
            "id": 1,
            "name": "Huntsville",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 2,
        "name": "University of Alabama at Birmingham",
        "city": {
            "id": 2,
            "name": "Birmingham",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 3,
        "name": "Amridge University",
        "city": {
            "id": 3,
            "name": "Montgomery",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 4,
        "name": "University of Alabama in Huntsville",
        "city": {
            "id": 1,
            "name": "Huntsville",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 5,
        "name": "Alabama State University",
        "city": {
            "id": 1,
            "name": "Huntsville",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 6,
        "name": "University of Alabama System Office",
        "city": {
            "id": 1,
            "name": "Huntsville",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 7,
        "name": "The University of Alabama",
        "city": {
            "id": 1,
            "name": "Huntsville",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 8,
        "name": "Central Alabama Community College",
        "city": {
            "id": 8,
            "name": "Alexander City",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 9,
        "name": "Athens State University",
        "city": {
            "id": 9,
            "name": "Athens",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 10,
        "name": "Auburn University at Montgomery",
        "city": {
            "id": 10,
            "name": "Auburn",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 11,
        "name": "Auburn University",
        "city": {
            "id": 10,
            "name": "Auburn",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 12,
        "name": "Birmingham Southern College",
        "city": {
            "id": 2,
            "name": "Birmingham",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 13,
        "name": "Chattahoochee Valley Community College",
        "city": {
            "id": 13,
            "name": "Phenix City",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 14,
        "name": "Concordia College Alabama",
        "city": {
            "id": 14,
            "name": "Selma",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 15,
        "name": "South University-Montgomery",
        "city": {
            "id": 15,
            "name": "Montgomery",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 16,
        "name": "Enterprise State Community College",
        "city": {
            "id": 16,
            "name": "Enterprise",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 17,
        "name": "Coastal Alabama Community College",
        "city": {
            "id": 17,
            "name": "Bay Minette",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 18,
        "name": "Faulkner University",
        "city": {
            "id": 18,
            "name": "Montgomery",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 19,
        "name": "Gadsden State Community College",
        "city": {
            "id": 19,
            "name": "Gadsden",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    },
    {
        "id": 20,
        "name": "New Beginning College of Cosmetology",
        "city": {
            "id": 20,
            "name": "Albertville",
            "state": {
                "id": 1,
                "name": "Alabama"
            }
        }
    }
]

const StateType = new GraphQLObjectType({
    name: 'State',
    description: 'State in which a University resides',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt) },
        name: {type: GraphQLNonNull(GraphQLString) }
    })
})

const CityType = new GraphQLObjectType({
  name: 'City',
  description: 'Where a university resides',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    state: {
        type: StateType
    }
  })
})

const UniversityType = new GraphQLObjectType({
    name: 'University',
    description: 'Where we can learn together!',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        city: {
            type: CityType
        }
    })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    university: {
      type: UniversityType,
      description: 'A Great School',
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
      },
      resolve: (parent, args) => universities.find(university => university.id === args.id)
    },
    universities: {
        type: new GraphQLList(UniversityType),
        description: 'List of all Universities!',
        resolve: () => universities
    }
  })
})

// const RootMutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Root Mutation',
//   fields: () => ({

//     addUniversity: {
//       type: UniversityType,
//       description: 'Add a university',
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//         city: { type: CityType }
//       },
//       resolve: (parent, args) => {
//         const uni = { id: universities.length + 1, name: args.name, city: args.city }
//         universities.push(uni)
//         return uni
//       }
//     }
//   })
// })

const schema = new GraphQLSchema({
  query: RootQueryType
//   mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))