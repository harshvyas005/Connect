package com.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
public class Twit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @ToString.Exclude
    private User user;

    private String content;
    private String image;
    private String video;
    private int totalReplies;
    private int totalRetweets;
    private int totalLikes;

    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Like> likes = new ArrayList<>();

    @OneToMany
    @ToString.Exclude
    private List<Twit> replyTwits = new ArrayList<>();

    @ManyToMany
    @ToString.Exclude
    private List<User> retwitUser = new ArrayList<>();

    @ManyToOne
    @ToString.Exclude
    private Twit replyFor;

    private boolean isReply;
    private boolean isTwit;
    private LocalDateTime createdAt;
    
    
}
