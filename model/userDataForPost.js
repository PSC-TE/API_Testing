import { faker } from '@faker-js/faker';

 export const userData = {
        email : faker.internet.email(),
        name : faker.name.findName(),
        gender : "male",
        status : "active"
        }

