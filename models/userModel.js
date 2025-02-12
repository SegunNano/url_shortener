import mongoose from "mongoose";
import cron from "node-cron";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema, model } = mongoose;
const required = true;
const unique = true;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required,
            unique
        },
        isVerified: {
            type: Boolean,
            required,
            default: false
        },
        linksLeft: {
            type: Number,
            required,
            default: 3
        },
        verifyEmailToken: { type: String, },
        verifyEmailTokenExpiration: { type: Date, },
        resetPasswordToken: { type: String },
        resetPasswordTokenExpiration: { type: Date, },
        linksUsed: {
            type: Number,
            required,
            default: 0
        },
        isAdmin: {
            type: Boolean,
        },
        lastUpdated: {
            type: Date,
            default: Date.now(),
            required
        }
    }, { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

const updateDocument = async (doc) => {
    try {
        doc.linksLeft = 3; // Modify this logic as needed
        doc.lastUpdated = new Date(); // Update the lastUpdated field
        await doc.save();
        console.log(`Document ${doc._id} updated successfully.`);
    } catch (error) {
        console.error(`Error updating document ${doc._id}:`, error);
    }
};

// Schedule Task to Check and Update Documents
cron.schedule('0 * * * *', async () => {
    // cron.schedule('0 0 * * *', async () => {
    console.log('Running task to check documents for updates...');

    try {
        const now = new Date();
        const documents = await User.find({});

        for (const doc of documents) {
            const lastUpdated = doc.lastUpdated || doc.createdAt; // Use lastUpdated or createdAt
            const nextUpdate = new Date(lastUpdated);
            nextUpdate.setDate(nextUpdate.getDate() + 30); // Calculate next update date

            if (now >= nextUpdate) {
                await updateDocument(doc); // Update document if it's time
            }
        }
    } catch (error) {
        console.error('Error checking or updating documents:', error);
    }
});

('Task scheduler is running. Documents will be checked every hour.');



export default User;