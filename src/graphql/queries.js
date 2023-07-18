/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchedule = /* GraphQL */ `
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
      id
      month
      year
      masses {
        id
        time
        days {
          id
          date
          breadMinisters {
            id
            name
          }
          cupMinisters {
            id
            name
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSchedules = /* GraphQL */ `
  query ListSchedules(
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        month
        year
        masses {
          id
          time
          days {
            id
            date
            breadMinisters {
            id
            name
          }
          cupMinisters {
            id
            name
          }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
