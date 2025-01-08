package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> 
{
//	@Query("SELECT l FROM Like l WHERE l.user.id=:userId AND l.twit.id=:twitId")
//	public Like isLikeExist(@Param("userId") Long userId,@Param("twitId")Long twitId);
	
	Like findByUserIdAndTwitId(Long userId, Long twitId);

	@Query("SELECT l FROM Like l WHERE l.twit.id=:twitId")
	public List<Like>findByTwitId(@Param("twitId") Long twitId);
}
