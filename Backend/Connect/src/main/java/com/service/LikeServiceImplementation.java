package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.Like;
import com.Entity.Twit;
import com.Entity.User;
import com.Exception.TwitException;
import com.Exception.UserException;
import com.Repository.LikeRepository;
import com.Repository.TwitRepository;

@Service
public class LikeServiceImplementation implements LikeService 
{
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private TwitService twitService;
	
	@Autowired
	private TwitRepository twitRepository;
	
	@Override
	public Like likeTwit(Long twitId, User user) throws UserException, TwitException {
	    Like existingLike = likeRepository.findByUserIdAndTwitId(user.getId(), twitId);
	    if (existingLike != null) {
	        // Unlike if already liked.
	        likeRepository.deleteById(existingLike.getId());
	        Twit twit = existingLike.getTwit();
	        twit.getLikes().remove(existingLike);
	        twitRepository.save(twit);
	        return existingLike;
	    }

	    // Like the twit.
	    Twit twit = twitService.findById(twitId);
	    Like newLike = new Like();
	    newLike.setTwit(twit);
	    newLike.setUser(user);

	    Like savedLike = likeRepository.save(newLike);
	    twit.getLikes().add(savedLike);
	    System.out.println(twit.getLikes());
	    twitRepository.save(twit);

	    return savedLike;
	}


	@Override
	public List<Like> getAllLikes(Long twitId) throws TwitException 
	{
		Twit twit=twitService.findById(twitId);
		List<Like> likes=likeRepository.findByTwitId(twitId);
		return likes;
	}

}
