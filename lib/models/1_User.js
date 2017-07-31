import keystone from 'keystone';

const Types = keystone.Field.Types;

const User = new keystone.List('User', {
    map : { name: 'email' }
});

User.add({
    email             : { type: Types.Email, initial: true, required: true, index: true },
    password          : { type: Types.Password },
    canAccessKeystone : { type: Boolean, default: false },
    createdAt         : { type: Types.Datetime, default: Date.now, format: 'DD-MM-YYYY', hidden: true },
    updatedAt         : { type: Types.Datetime, default: Date.now, format: 'DD-MM-YYYY', hidden: true }

});


User.schema.post('save', async (doc) => {
    const UserModel = keystone.list('User').model;
    const dateNow =  Date.now();

    await UserModel.update({ _id: doc._id }, { $set: { updatedAt: dateNow } });
});

User.register();
