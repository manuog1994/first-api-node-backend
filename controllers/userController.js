const User = require('../models/User');


module.exports = {
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message: 'User deleted successfully'});
        } catch (err) {
            res.status(500).json({message: 'Internal server error', err});
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                res.status(404).json({message: 'User does not exist'});
            }

            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}