package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Entity.Twit;
import com.Entity.User;

public interface TwitRepository extends JpaRepository<Twit, Long>
{
	List<Twit> findAllByIsTwitTrueOrderByCreatedAtDesc();
	List<Twit> findByRetwitUserContainsOrUser_IdAndIsTwitTrueOrderByCreatedAtDesc(User user,Long userId);
	List<Twit> findByLikesContainingOrderByCreatedAtDesc(User user);
	
	@Query("SELECT t from Twit t JOIN t.likes l WHERE l.user.id=:userId")
	List<Twit> findByLikesUser_Id(Long userId);
	

}
