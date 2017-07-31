import keystone from 'keystone';

const Types = keystone.Field.Types;

const User = new keystone.List('User');

User.add({
    name      : { type: Types.Name },
    email     : { type: Types.Email },
    password  : { type: Types.Password },
    tel       : { type: Types.Number },
    access    : { type: Types.Boolean },
    createdAt : { type: Types.Datetime, default: Date.now, format: 'DD-MM-YYYY', hidden: true },
    updatedAt : { type: Types.Datetime, default: Date.now, format: 'DD-MM-YYYY', hidden: true }

});


User.schema.post('save', async (doc) => {
    const UserModel = keystone.list('User').model;
    const dateNow =  Date.now();

    await UserModel.update({ _id: doc._id }, { $set: { updatedAt: dateNow } });
});

User.register();
