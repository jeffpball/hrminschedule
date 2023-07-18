/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
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
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
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
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
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
