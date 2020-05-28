package com.webcontroller.webcontroller.model;



import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URISyntaxException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


import java.nio.charset.StandardCharsets;
import java.security.*;
import java.util.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins ="http://localhost:3000")
public class NURMController {
    public usermapRepository UserMapRepository;
    public String Loginusername="";
    public static boolean stringCompare(String str1, String str2) {

        int l1 = str1.length();
        int l2 = str2.length();
        int lmin = Math.min(l1, l2);

        for (int i = 0; i < lmin; i++) {
            int str1_ch = (int) str1.charAt(i);
            int str2_ch = (int) str2.charAt(i);

            if (str1_ch != str2_ch) {
                return false;
            }
        }

        // Edge case for strings like
        // String 1="Geeks" and String 2="Geeksforgeeks"
        if (l1 != l2) {
            return false;
        }

        // If none of the above conditions is true,
        // it implies both the strings are equal
        else {
            return true;
        }
    }

    public static byte[][] GenerateKeyAndIV(int keyLength, int ivLength, int iterations, byte[] salt, byte[] password, MessageDigest md) {

        int digestLength = md.getDigestLength();
        int requiredLength = (keyLength + ivLength + digestLength - 1) / digestLength * digestLength;
        byte[] generatedData = new byte[requiredLength];
        int generatedLength = 0;

        try {
            md.reset();

            // Repeat process until sufficient data has been generated
            while (generatedLength < keyLength + ivLength) {

                // Digest data (last digest if available, password data, salt if available)
                if (generatedLength > 0)
                    md.update(generatedData, generatedLength - digestLength, digestLength);
                md.update(password);
                if (salt != null)
                    md.update(salt, 0, 8);
                md.digest(generatedData, generatedLength, digestLength);

                // additional rounds
                for (int i = 1; i < iterations; i++) {
                    md.update(generatedData, generatedLength, digestLength);
                    md.digest(generatedData, generatedLength, digestLength);
                }

                generatedLength += digestLength;
            }

            // Copy key and IV into separate byte arrays
            byte[][] result = new byte[2][];
            result[0] = Arrays.copyOfRange(generatedData, 0, keyLength);
            if (ivLength > 0)
                result[1] = Arrays.copyOfRange(generatedData, keyLength, keyLength + ivLength);

            return result;

        } catch (DigestException e) {
            throw new RuntimeException(e);

        } finally {
            // Clean out temporary data
            Arrays.fill(generatedData, (byte)0);
        }
    }

        @GetMapping("/getLoginusername")

        public JSONObject getLoginusername() throws URISyntaxException,ParseException,IOException{
        System.out.println("username:"+this.Loginusername);
        JSONObject logUserObject=new JSONObject();
        logUserObject.put("username",this.Loginusername);
        return logUserObject;
        }

        @GetMapping("/loginDecrypt/{username}")
        @ResponseBody
        public JSONObject loginDecrypt(@PathVariable("username") String username) throws URISyntaxException, ParseException, IOException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {

            JSONParser parser = new JSONParser();




            System.out.println(username);

            this.Loginusername=username;
            String Logusername="";
            String Pass="";
            Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\Loginusers.json"));
            JSONArray loginarr= (JSONArray) usermapobj;


            for(int m=0;m<loginarr.size();m++) {
                JSONObject logjsonobj = (JSONObject) loginarr.get(m);
                Logusername = (String) logjsonobj.get("username");
                Pass=(String) logjsonobj.get("password");
                if(stringCompare(Logusername,username))
                {
                    return logjsonobj;
                }
            }
            

            return null;



        }
        @GetMapping("/usermap/{usermapname}")
        public String usermaps( @PathVariable("usermapname") String usermapname) throws IOException, ParseException {
            JSONParser parser = new JSONParser();
            String umapdata="";
            Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));
            JSONArray umarr= (JSONArray) usermapobj;
            System.out.println(usermapname);

            for(int m=0;m<umarr.size();m++)
            {
                JSONObject umjsonobj=(JSONObject)umarr.get(m);
                umapdata=(String)umjsonobj.get(usermapname);
                if(umapdata!=null)
                {
                    return umapdata;
                }
            }
            return null;
        }

        @GetMapping("/settingsUserMap")

        public String SettingsUserMap() throws IOException,ParseException{

            JSONParser parser = new JSONParser();
            String umapdata="";
            Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));
            Object Settingsobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\Settings.json"));
            JSONArray umarr= (JSONArray) usermapobj;
            JSONObject setobj=(JSONObject) Settingsobj;
            String usermapname=(String)setobj.get("UserMapName");
            System.out.println(usermapname);

            for(int m=0;m<umarr.size();m++)
            {
                JSONObject umjsonobj=(JSONObject)umarr.get(m);
                umapdata=(String)umjsonobj.get(usermapname);
                if(umapdata!=null)
                {
                    System.out.println(umapdata);
                    return umapdata;
                }

            }
            return null;


        }




    @GetMapping("/usermap/save/{usermapname}")
    public JSONArray getusermaps( @PathVariable("usermapname") String usermapname) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        String umapdata="";
        Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));
        JSONArray umarr= (JSONArray) usermapobj;
//
//        for(int m=0;m<umarr.size();m++)
//        {
//            JSONObject umjsonobj=(JSONObject)umarr.get(m);
//            umapdata=(String)umjsonobj.get(usermapname);
//
//        } 

        return umarr;

    }






    @GetMapping("/usermap/list/listUserMaps")
    public JSONArray getusermapslist( ) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        String umapdata="";
        Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));
        JSONArray umarr= (JSONArray) usermapobj;
//
//        for(int m=0;m<umarr.size();m++)
//        {
//            JSONObject umjsonobj=(JSONObject)umarr.get(m);
//            umapdata=(String)umjsonobj.get(usermapname);
//
//        }

        return umarr;

    }




    @PostMapping("/usermap")
        @ResponseBody
    ResponseEntity<String> createUserMap(HttpEntity<String> httpEntity) throws URISyntaxException, ParseException, IOException {
        String params=httpEntity.getBody();
            JSONParser parser = new JSONParser();
        JSONObject httpobj=(JSONObject)parser.parse(params);
        String usermapname=(String)httpobj.get("usermapname");
        String LDAPAttr=(String)httpobj.get("LDAPAttributes");
        String MatchType=(String)httpobj.get("MatchType");
        String eDirAttr=(String)httpobj.get("eDirAttribute");
        String actDirAttr=(String)httpobj.get("actDirAttribute");
        String eDirCus="";
        String actDirCus="";
        boolean strCmpRes=false;

        System.out.println(params);
        String username,groupname,rights,ausername,arights,firstname,lastname,afirstname,alastname,agroupname;
            String jsonStr="";
            usermap u1;

//        user result=userrepository.save(User);

        Object obj= new Object();
        Object obj2=new Object();
        try {
            if(stringCompare(MatchType,"UsertoUser")) {
                obj = parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\eDirUsers.json"));
                obj2 = parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\actDirUsers.json"));


                // A JSON object. Key value pairs are unordered. JSONObject supports java.util.Map interface.
                JSONArray jsonArray = (JSONArray) obj;
                JSONArray jsonArray2 = (JSONArray) obj2;
                ArrayList<Dictionary> list1 = new ArrayList<Dictionary>();

                for (int i = 0; i < jsonArray.size(); i++) {
                    Dictionary d1 = new Hashtable();
                    int flag = 0;
                    ArrayList<String> list2 = new ArrayList<>();
                    JSONObject jsonObject = (JSONObject) jsonArray.get(i);

                    username = (String) jsonObject.get("username");
//                System.out.println("edir:"+username);



                    rights = (String) jsonObject.get("rights");
                    int ri[] = new int[8];

                    for (int p = 0; p < 8; p++) {
                        ri[p] = 0;
                    }
                    //srwcemfa
                    Dictionary rdict = new Hashtable();
                    rdict.put('s', 0);
                    rdict.put('r', 1);
                    rdict.put('w', 2);
                    rdict.put('c', 3);
                    rdict.put('e', 4);
                    rdict.put('m', 5);
                    rdict.put('f', 6);
                    rdict.put('a', 7);


                    for (int p = 0; p < rights.length(); p++) {
                        System.out.println(rights.charAt(p));
                        System.out.println(rdict.get('r'));


                        System.out.println(rdict.get((Character) rights.charAt(p)));
                        int temp1 = (int) rdict.get((Character) rights.charAt(p));
                        ri[temp1] = 1;
                    }

                    firstname = (String) jsonObject.get("firstname");
                    lastname = (String) jsonObject.get("lastname");
//                System.out.println("edir:"+rights);
                    eDirCus = (String) jsonObject.get(eDirAttr);


                    for (int j = 0; j < jsonArray2.size(); j++) {

                        JSONObject jsonObject2 = (JSONObject) jsonArray2.get(j);
                        int ari[] = new int[8];

                        for (int p = 0; p < 8; p++) {
                            ari[p] = 0;
                        }


                        ausername = (String) jsonObject2.get("username");
//                System.out.println("actdir:"+ausername);

                        arights = (String) jsonObject2.get("rights");

                        for (int p = 0; p < arights.length(); p++) {
                            int temp1 = (int) rdict.get(arights.charAt(p));
                            ari[temp1] = 1;
                        }


                        afirstname = (String) jsonObject2.get("firstname");
                        alastname = (String) jsonObject2.get("lastname");
                        actDirCus = (String) jsonObject2.get(actDirAttr);


//                System.out.println("actdir:"+arights);

                        if (stringCompare(LDAPAttr, "CNtoCN")) {

                            strCmpRes = stringCompare(username, ausername);
                        } else if (stringCompare(LDAPAttr, "CustomAttributes")) {
                            strCmpRes = stringCompare(eDirCus, actDirCus);
                        }

                        if (strCmpRes) {
                            flag = 1;
                            System.out.println(flag);
                            list2.add(username);
                            list2.add(Arrays.toString(ri));
                            list2.add(firstname);
                            list2.add(lastname);
                            list2.add(ausername);
                            list2.add(Arrays.toString(ari));
                            list2.add(afirstname);
                            list2.add(alastname);
                            list2.add(MatchType);
                            break;
                        }
                    }
                    if (flag == 0) {
                        list2.add(username);
                        list2.add("");
                        list2.add(firstname);
                        list2.add(lastname);
                        list2.add("");
                        list2.add("");
                        list2.add("");
                        list2.add("");
                        list2.add(MatchType);


                    }
                    d1.put(i, list2);
                    list1.add(d1);
                }
//            System.out.println(list1);
                jsonStr = JSONArray.toJSONString(list1);
                System.out.println(jsonStr);

            }

            if(stringCompare(MatchType,"GrouptoGroup")) {
                obj = parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\eDirGroups.json"));
                obj2 = parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\actDirGroups.json"));


                // A JSON object. Key value pairs are unordered. JSONObject supports java.util.Map interface.
                JSONArray jsonArray = (JSONArray) obj;
                JSONArray jsonArray2 = (JSONArray) obj2;
                ArrayList<Dictionary> list1 = new ArrayList<Dictionary>();

                for (int i = 0; i < jsonArray.size(); i++) {
                    Dictionary d1 = new Hashtable();
                    int flag = 0;
                    ArrayList<String> list2 = new ArrayList<>();
                    JSONObject jsonObject = (JSONObject) jsonArray.get(i);


                    groupname = (String) jsonObject.get("groupname");
//                System.out.println("edir:"+groupname);

                    rights = (String) jsonObject.get("rights");
                    int ri[] = new int[8];

                    for (int p = 0; p < 8; p++) {
                        ri[p] = 0;
                    }
                    //srwcemfa
                    Dictionary rdict = new Hashtable();
                    rdict.put('s', 0);
                    rdict.put('r', 1);
                    rdict.put('w', 2);
                    rdict.put('c', 3);
                    rdict.put('e', 4);
                    rdict.put('m', 5);
                    rdict.put('f', 6);
                    rdict.put('a', 7);


                    for (int p = 0; p < rights.length(); p++) {
                        System.out.println(rights.charAt(p));
                        System.out.println(rdict.get('r'));


                        System.out.println(rdict.get((Character) rights.charAt(p)));
                        int temp1 = (int) rdict.get((Character) rights.charAt(p));
                        ri[temp1] = 1;
                    }

                    firstname = (String) jsonObject.get("firstname");
                    lastname = (String) jsonObject.get("lastname");
//                System.out.println("edir:"+rights);
                    eDirCus = (String) jsonObject.get(eDirAttr);


                    for (int j = 0; j < jsonArray2.size(); j++) {

                        JSONObject jsonObject2 = (JSONObject) jsonArray2.get(j);
                        int ari[] = new int[8];

                        for (int p = 0; p < 8; p++) {
                            ari[p] = 0;
                        }


                        agroupname = (String) jsonObject2.get("groupname");
//                System.out.println("actdir:"+ausername);

                        arights = (String) jsonObject2.get("rights");

                        for (int p = 0; p < arights.length(); p++) {
                            int temp1 = (int) rdict.get(arights.charAt(p));
                            ari[temp1] = 1;
                        }


                        afirstname = (String) jsonObject2.get("firstname");
                        alastname = (String) jsonObject2.get("lastname");
                        actDirCus = (String) jsonObject2.get(actDirAttr);


//                System.out.println("actdir:"+arights);

                        if (stringCompare(LDAPAttr, "CNtoCN")) {

                            strCmpRes = stringCompare(groupname, agroupname);
                        } else if (stringCompare(LDAPAttr, "CustomAttributes")) {
                            strCmpRes = stringCompare(eDirCus, actDirCus);
                        }

                        if (strCmpRes) {
                            flag = 1;
                            System.out.println(flag);
                            list2.add(groupname);

                            list2.add(Arrays.toString(ri));
                            list2.add(firstname);
                            list2.add(lastname);
                            list2.add(agroupname);
                            list2.add(Arrays.toString(ari));
                            list2.add(afirstname);
                            list2.add(alastname);
                            list2.add(MatchType);
                            break;
                        }
                    }
                    if (flag == 0) {
                        list2.add(groupname);
                        list2.add("");
                        list2.add(firstname);
                        list2.add(lastname);
                        list2.add("");
                        list2.add("");
                        list2.add("");
                        list2.add("");
                        list2.add(MatchType);
                    }
                    d1.put(i, list2);
                    list1.add(d1);
                }
//            System.out.println(list1);
                jsonStr = JSONArray.toJSONString(list1);
                System.out.println(jsonStr);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
//        u1=new usermap("usermap1",jsonStr);
//            UserMapRepository.save(u1);
            JSONObject um1= new JSONObject();
            um1.put(usermapname,jsonStr);
            Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));

            try (FileWriter file = new FileWriter("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json")) {


                JSONArray arr1=(JSONArray) usermapobj ;
                JSONObject tempObj;
                Set<String> tempList;
//                System.out.println(arr1);
                for(int m=0; m < arr1.size() ; m++)
                {
                  tempObj=(JSONObject)arr1.get(m);
                  tempList=tempObj.keySet();
                  if(tempList.contains(usermapname))
                  {
                      arr1.remove(m);
                  }
                  System.out.println(tempObj);
                }

                arr1.add(um1);
                file.write(arr1.toJSONString());
                file.flush();
                file.close();

            } catch (IOException e) {
                e.printStackTrace();
            }


        return ResponseEntity.ok().body("actDirand eDir mapped");


    }

    @GetMapping("/sendusermap")

    public JSONArray sendusermaps() throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        String umapdata="";
        JSONArray umlist=new JSONArray();
        Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));
        JSONArray umarr= (JSONArray) usermapobj;


            JSONArray arr1=(JSONArray) usermapobj ;
            JSONObject tempObj;
            Set<String> tempList;

//                System.out.println(arr1);
            for(int m=0; m < arr1.size() ; m++)
            {
                tempObj=(JSONObject)arr1.get(m);
                tempList=tempObj.keySet();
//                System.out.println(tempList);
                umlist.add(tempList);

            }
            System.out.println(umlist);





        return umlist;

    }


    @PostMapping("/usermap/del")

    @ResponseBody
    ResponseEntity<String> delUserMap(HttpEntity<String> httpEntity) throws URISyntaxException, ParseException, IOException {
        String params = httpEntity.getBody();
        JSONParser parser = new JSONParser();
        JSONObject httpobj=(JSONObject)parser.parse(params);
        String usermapname=(String)httpobj.get("usermapname");




        Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));

        try (FileWriter file = new FileWriter("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json")) {


            JSONArray arr1=(JSONArray) usermapobj ;
            JSONObject tempObj;
            Set<String> tempList;
//                System.out.println(arr1);
            for(int m=0; m < arr1.size() ; m++)
            {
                tempObj=(JSONObject)arr1.get(m);
                tempList=tempObj.keySet();
                if(tempList.contains(usermapname))
                {
                    arr1.remove(m);
                    System.out.println(arr1);
                }
                System.out.println(tempObj);

            }

//            arr1.add(um1);
            file.write(arr1.toJSONString());
            file.flush();
            file.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body("usermap deleted");

    }


    @PostMapping("/usermap/import/{usermapname}")
    @ResponseBody
    ResponseEntity<String> importUserMap(HttpEntity<String> httpEntity,@PathVariable("usermapname") String usermapname) throws URISyntaxException, ParseException, IOException
    {
        String params = httpEntity.getBody();
//        System.out.println("params "+params);
        JSONParser parser = new JSONParser();
        JSONObject httpobj = (JSONObject) parser.parse(params);
//        String usermapname = (String) httpobj.get("usermapname");

        Object filedata= (Object)httpobj.get("filedata");

//        System.out.println(filedata);
        Object usermapobj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"));

        try (FileWriter file = new FileWriter("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\usermap.json"))
        {


            JSONArray arr1 = (JSONArray) usermapobj;
            JSONObject tempObj=new JSONObject();
            tempObj.put(usermapname,filedata);

            Set<String> tempList;
            System.out.println(tempObj);
            arr1.add(tempObj);
            file.write(arr1.toJSONString());
            file.flush();

        }

        catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body("usermap imported");
    }



    @GetMapping("/viewrights/{volumename}")

    public JSONArray viewRights(@PathVariable("volumename") String volumename) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        String username="";
        String rights="";
        String volname="";
        String groupname="";

        Object eDirobj1=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\eDirUsers.json"));
        Object actDirobj2=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\actDirUsers.json"));
        JSONArray vrarr1= (JSONArray) eDirobj1;
        JSONArray vrarr2= (JSONArray) actDirobj2;
        Object eDirobj3=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\eDirGroups.json"));
        Object actDirobj4=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\actDirGroups.json"));
        JSONArray vrarr3= (JSONArray) eDirobj3;
        JSONArray vrarr4= (JSONArray) actDirobj4;
        int ri[] = new int[8];

        for(int p=0;p<8;p++)
        {
            ri[p]=0;
        }
        //srwcemfa
        Dictionary rdict=new Hashtable();
        rdict.put('s',0);
        rdict.put('r',1);
        rdict.put('w',2);
        rdict.put('c',3);
        rdict.put('e',4);
        rdict.put('m',5);
        rdict.put('f',6);
        rdict.put('a',7);

        JSONArray viewRightsarr=new JSONArray();
        JSONArray viewRightsarr1=new JSONArray();
        JSONArray viewRightsarr2=new JSONArray();
        JSONArray viewRightsarr3=new JSONArray();
        JSONArray viewRightsarr4=new JSONArray();


        for(int m=0;m<vrarr1.size();m++)
        {
            JSONObject vrjsonobj=(JSONObject)vrarr1.get(m);
            username=(String)vrjsonobj.get("username");
            volname=(String)vrjsonobj.get("volume");
            System.out.println(volname);
            rights=(String)vrjsonobj.get("rights");
            JSONObject userobj=new JSONObject();
            for(int p=0;p<8;p++)
            {
                ri[p]=0;
            }

            for(int p=0;p<rights.length();p++)
            {
                //System.out.println(rights.charAt(p));
//                System.out.println(rdict.get('r'));


//                System.out.println(rdict.get((Character)rights.charAt(p)));
                int temp1=(int)rdict.get((Character)rights.charAt(p));
                ri[temp1]=1;
            }
            if(stringCompare(volname,volumename))
            {
                userobj.put(username,Arrays.toString(ri));
                System.out.println(userobj);
                viewRightsarr1.add(userobj);

            }


        }

        for(int m=0;m<vrarr2.size();m++)
        {
            JSONObject vrjsonobj=(JSONObject)vrarr2.get(m);
            username=(String)vrjsonobj.get("username");
            volname=(String)vrjsonobj.get("volume");
            System.out.println(volname);
            rights=(String)vrjsonobj.get("rights");
            JSONObject userobj=new JSONObject();
            for(int p=0;p<8;p++)
            {
                ri[p]=0;
            }
            for(int p=0;p<rights.length();p++)
            {
                //System.out.println(rights.charAt(p));
//                System.out.println(rdict.get('r'));


//                System.out.println(rdict.get((Character)rights.charAt(p)));
                int temp1=(int)rdict.get((Character)rights.charAt(p));
                ri[temp1]=1;
            }
            if(stringCompare(volname,volumename))
            {
                userobj.put(username,Arrays.toString(ri));
                System.out.println(userobj);
                viewRightsarr2.add(userobj);

            }


        }
        for(int m=0;m<vrarr3.size();m++)
        {
            JSONObject vrjsonobj=(JSONObject)vrarr3.get(m);
            groupname=(String)vrjsonobj.get("groupname");
            volname=(String)vrjsonobj.get("volume");
            System.out.println(volname);
            rights=(String)vrjsonobj.get("rights");
            JSONObject userobj=new JSONObject();
            for(int p=0;p<8;p++)
            {
                ri[p]=0;
            }
            for(int p=0;p<rights.length();p++)
            {
                //System.out.println(rights.charAt(p));
//                System.out.println(rdict.get('r'));


//                System.out.println(rdict.get((Character)rights.charAt(p)));
                int temp1=(int)rdict.get((Character)rights.charAt(p));
                ri[temp1]=1;
            }
            if(stringCompare(volname,volumename))
            {
                userobj.put(groupname,Arrays.toString(ri));
                System.out.println(userobj);
                viewRightsarr3.add(userobj);

            }


        }
        for(int m=0;m<vrarr4.size();m++)
        {
            JSONObject vrjsonobj=(JSONObject)vrarr4.get(m);
            groupname=(String)vrjsonobj.get("groupname");
            volname=(String)vrjsonobj.get("volume");
            System.out.println(volname);
            rights=(String)vrjsonobj.get("rights");
            JSONObject userobj=new JSONObject();
            for(int p=0;p<8;p++)
            {
                ri[p]=0;
            }
            for(int p=0;p<rights.length();p++)
            {
                //System.out.println(rights.charAt(p));
//                System.out.println(rdict.get('r'));


//                System.out.println(rdict.get((Character)rights.charAt(p)));
                int temp1=(int)rdict.get((Character)rights.charAt(p));
                ri[temp1]=1;
            }
            if(stringCompare(volname,volumename))
            {
                userobj.put(groupname,Arrays.toString(ri));
                System.out.println(userobj);
                viewRightsarr4.add(userobj);

            }


        }
        viewRightsarr.add(viewRightsarr1);
        viewRightsarr.add(viewRightsarr2);
        viewRightsarr.add(viewRightsarr3);
        viewRightsarr.add(viewRightsarr4);
        System.out.println(viewRightsarr);
        return viewRightsarr;



    }


    @GetMapping("/listvolumes")


    public Set<String> listVol() throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        Object eDirobj1=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\eDirUsers.json"));
        Object actDirobj2=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\actDirUsers.json"));
        JSONArray vrarr1= (JSONArray) eDirobj1;
        JSONArray vrarr2= (JSONArray) actDirobj2;
        String vol="";
        Set<String> volumes = new HashSet<String>();
        for(int m=0;m<vrarr1.size();m++) {
            JSONObject vrjsonobj = (JSONObject) vrarr1.get(m);
            vol= (String) vrjsonobj.get("volume");
            volumes.add(vol);


        }
        for(int m=0;m<vrarr2.size();m++) {
            JSONObject vrjsonobj = (JSONObject) vrarr2.get(m);
            vol= (String) vrjsonobj.get("volume");
            volumes.add(vol);


        }
        System.out.println(volumes);
        return volumes;


    }


    @PostMapping("/settings")

    @ResponseBody
    ResponseEntity<String> Savesettings(HttpEntity<String> httpEntity) throws URISyntaxException, ParseException, IOException {
        String params = httpEntity.getBody();
        JSONParser parser = new JSONParser();
        JSONObject httpobj = (JSONObject) parser.parse(params);
        String language = (String) httpobj.get("Language");
        String loglevel =(String) httpobj.get("LogLevel");
        boolean contextlesslogin = (boolean)httpobj.get("ContextlessLogin");
        boolean IDMvalue =(boolean) httpobj.get("IDMvalue");
        boolean Usermapvalue=(boolean) httpobj.get("Usermapvalue");
        String usermapname=(String) httpobj.get("usermapname");
        Object obj=parser.parse(new FileReader("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\Settings.json"));

        try (FileWriter file = new FileWriter("C:\\Users\\Dhanushguntha\\Desktop\\webcontroller\\webcontroller\\src\\main\\java\\com\\webcontroller\\webcontroller\\model\\Settings.json"))
        {


            JSONObject obj1 = (JSONObject) obj;
            JSONObject tempObj=new JSONObject();

            tempObj=obj1;
            tempObj.put("Language",language);
            tempObj.put("Loglevel",loglevel);
            tempObj.put("ContextlessLogin",contextlesslogin);
            tempObj.put("IDM",IDMvalue);
            tempObj.put("UserMap",Usermapvalue);
            tempObj.put("UserMapName",usermapname);
            System.out.println(tempObj.toJSONString());
            file.write(tempObj.toJSONString());
            file.flush();


        }

     return ResponseEntity.ok().body("Settings Updated");
    }

}
