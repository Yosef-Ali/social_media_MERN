// Import User model
import User from "../models/User.js";

/* READ */

export const getUser = async (req, res) => {
  try {
    // Get user id from request parameters
    const { id } = req.params;

    // Find user by id
    const user = await User.findById(id);

    // Send response with user object
    res.status(200).json(user);
  } catch (err) {
    // Send 404 if user not found
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    // Find user by id
    const user = await User.findById(id);
    // user.friends is an array of friend ids

    // Map through each id and find the friend user object
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Promise.all is used to concurrently lookup each friend
    // This is faster than finding friends sequentially with multiple awaits

    // Format friend objects before response
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Send response with formatted friends array
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    // Get user id and friend id from request params
    const { id, friendId } = req.params;

    // Find user and friend objects
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Check if friend is already in user's friend list
    if (user.friends.includes(friendId)) {
      // Remove friend from user's list
      user.friends = user.friends.filter((id) => id !== friendId);

      // Remove user from friend's list
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // Add friend to user's list
      user.friends.push(friendId);

      // Add user to friend's list
      friend.friends.push(id);
    }

    // Save updated user and friend objects
    await user.save();
    await friend.save();

    // Refetch updated friend list and format
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Send response with updated friends list
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
