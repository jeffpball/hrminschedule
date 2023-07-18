/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onCreateSchedule(filter: $filter) {
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
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onUpdateSchedule(filter: $filter) {
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
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onDeleteSchedule(filter: $filter) {
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
