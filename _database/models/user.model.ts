import { ITask } from "@/_library/types-interfaces-classes/task";
import mongoose, { Schema, Document } from "mongoose";

/**
 * Credentials used for authentication.
 */
export type Credentials = {
    /** The credential, which may be an email or username. */
    credential: string;
    /** The secret/password associated with the credential. */
    secret: string;
};

/**
 * Form structure used for new user registration.
 */
export interface IUserForm {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    confirmEmail: string;
    avatar: string;
    password: string;
    confirmPassword: string;
    role: "customer" | "partner" | "admin";
}

/**
 * Interface representing a full User document in MongoDB.
 */
export interface IUser extends Document {
    /** User's first name */
    firstName: string;

    /** User's last name */
    lastName: string;

    /** Unique username */
    username: string;

    /** Unique email address */
    email: string;

    /** Whether the email has been verified */
    emailVerified: boolean;

    /** Whether an admin has approved the account */
    accountApproved: boolean;

    /** URL or path to user avatar */
    avatar: string;

    /** Hashed password */
    password: string;

    /** User's role in the system */
    role: "customer" | "partner" | "admin";

    /** Timestamp of document creation */
    createdAt: Date;

    /** Timestamp of last update */
    updatedAt: Date;

    /** Token used for email verification */
    verificationToken: string;

    /** Expiration timestamp of the verification token */
    verificationTokenExpiration: Date;

    /** Last login timestamp */
    lastLogin: Date;

    /** Number of successful logins */
    loginCount: number;

    /** Categories the user is interested in */
    preferredCategories: string[];

    /** User’s past search queries */
    searchHistory: string[];

    /** Products the user has viewed */
    viewedProducts: mongoose.Types.ObjectId[];

    /** Orders made by the user */
    purchaseHistory: mongoose.Types.ObjectId[];

    /** Carts the user abandoned */
    abandonedCarts: mongoose.Types.ObjectId[];

    /** Product wishlist */
    wishlist: mongoose.Types.ObjectId[];

    /** Favorited products */
    favorites: mongoose.Types.ObjectId[];

    /** Product reviews submitted */
    reviewsGiven: mongoose.Types.ObjectId[];

    /** Preferences for marketing communication */
    communicationPreferences: {
        emailMarketing: boolean;
        smsMarketing: boolean;
        pushNotifications: boolean;
    };

    /** Accumulated reward points */
    rewardPoints: number;

    /** Membership level in loyalty program */
    membershipTier: "basic" | "silver" | "gold" | "platinum";

    /** Default address used for shipping */
    defaultShippingAddress: mongoose.Types.ObjectId;

    /** Additional saved addresses */
    savedAddresses: mongoose.Types.ObjectId[];

    /** Stored payment methods */
    savedPaymentMethods: mongoose.Types.ObjectId[];


    tasks: ITask[]; // 👈 Added
}

/**
 * Mongoose schema for the `User` model.
 */
const UserSchema = new Schema<IUser>(
    {
        firstName: { type: String },
        lastName: { type: String },
        username: { type: String },
        email: { type: String, required: true, unique: true },
        emailVerified: { type: Boolean, default: false },
        accountApproved: { type: Boolean, default: false },
        avatar: { type: String },
        password: { type: String },
        role: {
            type: String,
            enum: ["customer", "partner", "admin"],
            default: "customer",
        },

        // Verification
        verificationToken: { type: String },
        verificationTokenExpiration: { type: Date },

        // Analytics
        lastLogin: { type: Date },
        loginCount: { type: Number, default: 0 },
        preferredCategories: [{ type: String }],
        searchHistory: [{ type: String }],
        viewedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        purchaseHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
        abandonedCarts: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        reviewsGiven: [{ type: Schema.Types.ObjectId, ref: "Review" }],

        // Communication Preferences
        communicationPreferences: {
            emailMarketing: { type: Boolean, default: true },
            smsMarketing: { type: Boolean, default: false },
            pushNotifications: { type: Boolean, default: true },
        },

        // Loyalty
        rewardPoints: { type: Number, default: 0 },
        membershipTier: {
            type: String,
            enum: ["basic", "silver", "gold", "platinum"],
            default: "basic",
        },

        // Address & Payment
        defaultShippingAddress: { type: Schema.Types.ObjectId, ref: "Address" },
        savedAddresses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Address",
                default: [],
            },
        ],
        savedPaymentMethods: [
            {
                type: Schema.Types.ObjectId,
                ref: "PaymentMethod",
                default: [],
            },
        ],
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    }
);

/**
 * The Mongoose User model based on the schema.
 */
const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
