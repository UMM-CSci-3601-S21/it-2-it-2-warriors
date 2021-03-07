package umm3601.contextpack;


import org.mongojack.Id;
import org.mongojack.ObjectId;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)

public class ContextPack {
  @ObjectId @Id
  public String _id;

  public String name;
  public boolean enabled;
  public Wordlist wordlist;

}



