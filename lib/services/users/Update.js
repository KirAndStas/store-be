import keystone from 'keystone';
import Base from 'service-layer/Base';
import Exception from 'service-layer/Exception';

const User = keystone.list('User').model;

export default class Create extends Base {
    static validationRules = {
        data : ['required', { 'nested_object' : {
            'email' : [ 'required' ]
        } } ]
    }

    async execute({ data }) {
        const { email } = data;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Exception({
                code   : 'CANT_FETCH_USER',
                fields : {
                    email : 'WRONG_EMAIL'
                }
            });
        }

        user.sendNewPassword = true;
        await user.save();


        return { data: {} };
    }
}
