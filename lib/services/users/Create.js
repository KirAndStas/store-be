import keystone from 'keystone';
import Base from 'service-layer/Base';
import Exception from 'service-layer/Exception';
import { dumpNewUser } from '../../utils/services.js';

const User = keystone.list('User').model;

export default class Create extends Base {
    static validationRules = {
        data : ['required', { 'nested_object' : {
            'name'     : [ 'required' ],
            'email'    : [ 'required' ],
            'password' : [ 'required' ],
            'tel'      : [ 'required' ],
            'access'   : [ 'required' ]
        } } ]
    }

    async execute({ data }) {
        const { name, email, password, tel, access } = data;
        const newUser = new User();

        newUser.set({
            name,
            email,
            password,
            tel,
            access
        });


        await newUser.save();


        return { data: dumpNewUser(newUser) };
    }
}
