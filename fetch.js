import DomSelector from 'react-native-dom-parser';

var DomParser = require('react-native-html-parser').DOMParser

var complete_uri = "/_api/1.0/tasks/" + "/responses";


//Variables

const Instrument_Lesson_Max = 10;


module.exports.Login = function (username, password) {
    var data = `username=${username}&password=${password}`;
 
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", "https://vle.kings-school.co.uk/login/login.aspx?prelogin=https%3a%2f%2fvle.kings-school.co.uk%2f&kr=ActiveDirectoryKeyRing", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
    xhr.setRequestHeader("referer", "https://vle.kings-school.co.uk/login/login.aspx?prelogin=https^%^3a^%^2f^%^2fvle.kings-school.co.uk^%^2f");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "71baa037-bbfb-47ab-9d52-0260ea926d70");

    xhr.send(data);

    
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.responseURL === "https://vle.kings-school.co.uk/"){
                module.exports.PupilPortalLogin(username, password);
                resolve(xhr);
            }
            else{
                reject(xhr);
            } 
        };
    });
};

module.exports.LogOut = function(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://vle.kings-school.co.uk/logout");
    xhr.setRequestHeader("authority", "vle.kings-school.co.uk");
    xhr.setRequestHeader("upgrade-insecure-requests", "1");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36");
    xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    xhr.setRequestHeader("referer", "https://vle.kings-school.co.uk/");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
    xhr.setRequestHeader("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.setRequestHeader("Postman-Token", "42b4b060-b90c-4982-b627-524ad86c1f83");

    xhr.send(data);

    return new Promise((resolve, reject) =>{
        xhr.onload = function(){
            resolve();
        };
    });
};

module.exports.GetTasks = function () {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://vle.kings-school.co.uk/set-tasks");
    xhr.setRequestHeader("authority", "vle.kings-school.co.uk");
    xhr.setRequestHeader("upgrade-insecure-requests", "1");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
    xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    xhr.setRequestHeader("referer", "https://vle.kings-school.co.uk/");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
    xhr.setRequestHeader("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
    
    return new Promise((resolve, reject) =>{
        xhr.onload = function () {
            if (xhr.status >= 200) {
                var rootNode = DomSelector(xhr.response); 
                var tasks = rootNode.getElementsByClassName("ff-task");
                var task_info = [];
                
                for(var i = 0;i < tasks.length;i++){
                    var currentInfo = {};
                    
                    currentInfo["key"] = String(i);
                    currentInfo["id"] = tasks[i].getElementsByClassName("ff-message-text")[0].children[0].children[0].attributes["href"].split("set-tasks/")[1];
                    
                    currentInfo["INFO"] = tasks[i].getElementsByClassName("ff-message-text")[0].children[0].children[0].children[0].text;

                    var msg_meta = tasks[i].getElementsByClassName("ff-message-meta")[0];
                    
                    var due = msg_meta.children[0].children[0].text == "New" ? msg_meta.children[1].children[0].text : msg_meta.children[0].children[0].text;
                    due += "    "; 
                    currentInfo["DUE"] = due;
                    
                    currentInfo["WARNINGLEVEL"] = (currentInfo["DUE"].trim() == "Due Tomorrow") ? '#f9e706' : currentInfo["DUE"].trim() == "Overdue" ? '#ff6666' : '#f2f2f2';
                    
                    if(msg_meta.getElementsByTagName("a").length > 0){
                        currentInfo["TEACH"] = msg_meta.getElementsByTagName("a")[0].children[0].text;
                    }
                    else{
                        currentInfo["TEACH"] = "Personal Task";
                    }
                    task_info.push(currentInfo);
                }
                resolve(task_info);
            }
            else{
                reject(xhr.response);
            }
        };
    });
};

module.exports.GetSingle = function(id){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://vle.kings-school.co.uk/set-tasks/" + id);
    xhr.setRequestHeader("authority", "vle.kings-school.co.uk");
    xhr.setRequestHeader("cache-control", "max-age=0,no-cache");
    xhr.setRequestHeader("upgrade-insecure-requests", "1");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36");
    xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    xhr.setRequestHeader("referer", "https://vle.kings-school.co.uk/set-tasks");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
    xhr.setRequestHeader("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    xhr.setRequestHeader("Postman-Token", "455466d5-3969-4a8e-8914-78b26b7c5fdb");

    xhr.send(data);

    return new Promise((resolve, reject) => {
        xhr.onload = function(){
            var reg = /users&quot;:{&quot;[a-zA-Z0-9]{31,33}/gm;  
            var content = reg.exec(xhr.responseText)[0]; 
            content = content.replace("users&quot;:{&quot;", "");
            resolve(content);
        };
    });
};

module.exports.CompleteTask = function(task_id, content){
    var new_data = `data=%7B%22recipient%22%3A%7B%22type%22%3A%22user%22%2C%22guid%22%3A%22${content}%22%7D%2C%22event%22%3A%7B%22type%22%3A%22mark-as-done%22%2C%22feedback%22%3A%22%22%2C%22sent%22%3A%222018-10-29T08%3A03%3A48.529Z%22%2C%22author%22%3A%22${content}%22%7D%7D`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", "https://vle.kings-school.co.uk/_api/1.0/tasks/" + task_id + "/responses");
    xhr.setRequestHeader("origin", "https://vle.kings-school.co.uk");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.setRequestHeader("referer", "https://vle.kings-school.co.uk/set-tasks/71894");
    xhr.setRequestHeader("authority", "vle.kings-school.co.uk");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "a24bdd98-00e8-4d94-8f69-b9ee377b1ea7");

    xhr.send(new_data); 

    return new Promise((resolve, reject) =>{
        xhr.onload = function(){
            if (xhr.status >= 200 && xhr.status != 403){
                resolve(xhr.response);
            }
            else{
                reject(xhr.response);
            }
        };
    });
};

module.exports.GetSportsFixtures = function(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "http://www.kings-sport.co.uk/");
    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("Cache-Control", "max-age=0");
    xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
    xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36");
    xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
    xhr.setRequestHeader("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
    xhr.setRequestHeader("Cookie", "ASPSESSIONIDCCRBQRTQ=GMEAHOEBJLOLHDBAAPHHHGNG; _ga=GA1.3.1151144811.1542638270; _gid=GA1.3.1497059572.1542638270; _gat_gtag_UA_4765484_1=1");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "f8423556-f6de-48c8-bbb7-a5a041d50265");

    xhr.send(data);

    return new Promise((resolve, reject) => { 
        xhr.onload = function(){
            var tbody = /<table>[\s\S]*?<\/table>/gm;
            var openingA = /<a[\s\S]*?>/gm;
            var closingA = /<\/a>/gm; 
            
            var html = "<html>";
            html += tbody.exec(xhr.response);  
            html = html.replace(openingA, "<span>").replace(closingA, "</span>")
            html += "</html>";

            var extraHtml = "<html>";
            var div = /<div id="Results"[\s\S]*?>[\s\S]*?<\/div>/gm;
            extraHtml += div.exec(xhr.response);
            extraHtml = extraHtml.replace(openingA, "<span>").replace(closingA, "</span>");
            extraHtml += "</html>";

            resolve(html + "JIGGLYPUFF" + extraHtml);
        };
    });
};

module.exports.GetLunchMenu = function(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://vle.kings-school.co.uk/school-menu");
    xhr.setRequestHeader("authority", "vle.kings-school.co.uk");
    xhr.setRequestHeader("cache-control", "max-age=0,no-cache");
    xhr.setRequestHeader("upgrade-insecure-requests", "1");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7"); 
    xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
    xhr.setRequestHeader("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    // xhr.setRequestHeader("cookie", "_hp2_props.2986378716=%7B%22Firefly%20Version%22%3A%2260604%22%2C%22Firefly%20Mode%22%3A%22Firefly%206%20is%20enabled%22%7D;  ASP.NET_SessionId=uqkxvbi1a1ucdajuzluolmsp; FireflyNETLoggedIn=yes; Prelogin=https://vle.kings-school.co.uk/set-tasks; SessionSecureA=SJWGBpbOQgOKcAbXkOdCCueodddZ9PyG6Ei/r9bKRILghtFhHq1ew4xsqsGXMCL1Wk8=; SessionSecureB=81pEYqfkJiqNDq4h3f7hzVkVU0bSt+ybg3IlXs23+UYAQyJjYELoZIjF5s1DNk6ZHRI=; _hp2_ses_props.2986378716=%7B%22r%22%3A%22https%3A%2F%2Fvle.kings-school.co.uk%2Flogin%2Flogin.aspx%3Fprelogin%3Dhttps%253a%252f%252fvle.kings-school.co.uk%252fset-tasks%22%2C%22ts%22%3A1542024177260%2C%22d%22%3A%22vle.kings-school.co.uk%22%2C%22h%22%3A%22%2Fset-tasks%22%7D; SP%5FShared=SPSessionKey=rl4i3o5crbh&SPUserCode=JuszczakiewiczLewis200280408100160; _hp2_id.2986378716=%7B%22userId%22%3A%221016638127254409%22%2C%22pageviewId%22%3A%223835661983937270%22%2C%22sessionId%22%3A%222223245216886248%22%2C%22identity%22%3A%224c615d6b24e8414799aef9a8cd96c5b8%40vle.kings-school.co.uk%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%2C%22oldIdentity%22%3Anull%7D");
    xhr.setRequestHeader("Postman-Token", "fa762245-7fff-4bc5-b47a-6a20ec500ff4");

    xhr.send(data);

    return new Promise((resolve, reject) =>{
        xhr.onload = function(){
            var html = '<html><head><meta name="viewport" content="initial - scale=1.0, maximum - scale=1.0"></head>';
            var table = /<tbody>[\s\S]*?<\/tbody>/gm;
 
            html += table.exec(xhr.responseText); 
            html += "</table> </div>"
            html += "</html>";

            resolve(html);
        };
    });
};

module.exports.GetReports = function(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://vle.kings-school.co.uk/my-information/my-reports");
    xhr.setRequestHeader("authority", "vle.kings-school.co.uk");
    xhr.setRequestHeader("cache-control", "max-age=0,no-cache");
    xhr.setRequestHeader("upgrade-insecure-requests", "1");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36");
    xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    xhr.setRequestHeader("referer", "https://vle.kings-school.co.uk/my-information");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
    xhr.setRequestHeader("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    xhr.setRequestHeader("Postman-Token", "016bd381-f8d8-46e0-918d-af7c6bbc6324");

    xhr.send(data);

    return new Promise((resolve, reject) => {
        xhr.onload = function(){
            var content = "<html>";
            
            var section = /<section class="user-content">[\s\S]*?<\/section>/gm;
            var menuItems = /<[dD][iI][vV] class=menuitems>[\s\S]*?<\/[dD][iI][vV]>/gm; 
            var footerItems = /<div class="ff-post-interaction"[\s\S]*?>[\s\S]*?<\/div>/gm;

            content += section.exec(xhr.responseText);
            content += "</html>";

            content = content.replace(menuItems, "");
            content = content.replace(footerItems, "");
            
            resolve(content); 
        };
    });
};

module.exports.GetMusicLessons = function(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://vle.kings-school.co.uk/my-information/instrument-lessons");
    xhr.setRequestHeader("authority", "vle.kings-school.co.uk");
    xhr.setRequestHeader("upgrade-insecure-requests", "1");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36");
    xhr.setRequestHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    xhr.setRequestHeader("referer", "https://vle.kings-school.co.uk/my-information");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
    xhr.setRequestHeader("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    xhr.setRequestHeader("cookie", "_hp2_props.2986378716=%7B%22Firefly%20Version%22%3A%2260604%22%2C%22Firefly%20Mode%22%3A%22Firefly%206%20is%20enabled%22%7D; ASP.NET_SessionId=uqkxvbi1a1ucdajuzluolmsp; Prelogin=https://vle.kings-school.co.uk/; FireflyNETLoggedIn=yes; SessionSecureA=DMpP0fFWSR/0nhZsSnmPJZyjfD1VCxNV2iAxtJUMwpkpAIzF948XNYGPVw7mUPwVzm8=; SessionSecureB=CDzQsf87HvaEgh1+c8mMBu0xY0Fjps+WEJqG3ooJrAgQnymkp/42idYK9DdB3iw6OWA=; SP%5FShared=SPSessionKey=tp4wdytuxdj&SPUserCode=JuszczakiewiczLewis200280408100160; _hp2_ses_props.2986378716=%7B%22ts%22%3A1541953302207%2C%22d%22%3A%22vle.kings-school.co.uk%22%2C%22h%22%3A%22%2F%22%7D; _hp2_id.2986378716=%7B%22userId%22%3A%224953539807444690%22%2C%22pageviewId%22%3A%222701894628364692%22%2C%22sessionId%22%3A%223886337071874885%22%2C%22identity%22%3A%224c615d6b24e8414799aef9a8cd96c5b8%40vle.kings-school.co.uk%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "b9e48133-1c03-430c-8cea-8fa0a132ac7b");

    xhr.send(data);

    return new Promise((resolve, reject) => {
        xhr.onload = function(){
            var rootNode = DomSelector(xhr.response); 
            var content = rootNode.getElementsByClassName("ff-structureddata");
            var tr = content[0].children[0];   
    
            var all_tasks = [];
            var length = tr.children.length > Instrument_Lesson_Max ? Instrument_Lesson_Max : tr.children.length;
    
            for(var i = 0;i < length;i++){
                var current = {};
    
                var parent = tr.children[i];
    
                var date = parent.children[1].children[0].text;
                var instrument = parent.children[2].children[0].text;
                var teacher = parent.children[3].children[0].text;
    
                var instrument_regex = /:/gm;
                var index = instrument.search(instrument_regex);
                instrument = instrument.substr(index+2, instrument.length);
    
                current["key"] = String(i);  
                current["date"] = date;
                current["instrument"] = instrument;
                current["teacher"] = teacher;
                all_tasks.push(current);
            }

            resolve(all_tasks);
        };
    });
};

module.exports.PupilPortalLogin = function(username, password){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", "https://pupil.kings-school.co.uk/sso/antiforgery.ashx");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "4f5e4d63-a5ed-4c70-aaa6-ae1c49fb9775");

    xhr.send(data);

    xhr.onload = function () {
        if (xhr.status >= 200) {
            var root = new DomParser().parseFromString(xhr.response, 'text/html');
            var scripts = root.getElementsByTagName('script');
            // console.log(Object.keys(scripts._node.firstChild.attributes._ownerElement.firstChild.childNodes[0]));
            var tag = scripts._node.firstChild.attributes._ownerElement.firstChild.childNodes[0].childNodes[0].data;
            const regex = /value=".+"/gm;
            var value = regex.exec(tag)[0].split("value=")[1];
            value = value.substr(1, value.length - 2);

            var new_data = `__RequestVerificationToken=${value}&intLoginCount=EBDA&intArea=2&encreferer=&username=${username}&password=${password}`; 
            
            var next_xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            next_xhr.open("POST", "https://pupil.kings-school.co.uk/sso/login.ashx");
            next_xhr.setRequestHeader("Connection", "keep-alive");
            next_xhr.setRequestHeader("Cache-Control", "max-age=0");
            next_xhr.setRequestHeader("Origin", "https://pupil.kings-school.co.uk");
            next_xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
            next_xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            next_xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36");
            next_xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
            next_xhr.setRequestHeader("Referer", "https://pupil.kings-school.co.uk/api/login/index.asp?");
            next_xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
            next_xhr.setRequestHeader("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
            next_xhr.setRequestHeader("Cookie", "__RequestVerificationToken=Amic_FqGUV5KeZsnhNOHwYiKFUgij5BJRspDrMVpS-oiHD47HrEar7R78mkSAxHZ9BifQiREXrVAR5nNZCY-pYMQNPCwL-JJqq-27oG27FE1;");
            next_xhr.setRequestHeader("cache-control", "no-cache");
            next_xhr.setRequestHeader("Postman-Token", "3dd64aa9-42e4-4315-9ca1-2e162181ea3c");

            next_xhr.send(new_data);
        }
    };
};

module.exports.GetTimetable = function(){
    var data = null;

    var final_xhr = new XMLHttpRequest();
    final_xhr.withCredentials = true;

    final_xhr.open("GET", "https://pupil.kings-school.co.uk/api/profile/timetable/");
    final_xhr.setRequestHeader("Connection", "keep-alive");
    final_xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
    final_xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36");
    final_xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
    final_xhr.setRequestHeader("Referer", "https://pupil.kings-school.co.uk/api/homepage/");
    // final_xhr.setRequestHeader("Cookie", "_hp2_props.2986378716=%7B%22Firefly%20Version%22%3A%2260604%22%2C%22Firefly%20Mode%22%3A%22Firefly%206%20is%20enabled%22%7D; ASPSESSIONIDCEQTADRA=MKMLBGJDCHILMPAJMPLMIALM; __RequestVerificationToken=Amic_FqGUV5KeZsnhNOHwYiKFUgij5BJRspDrMVpS-oiHD47HrEar7R78mkSAxHZ9BifQiREXrVAR5nNZCY-pYMQNPCwL-JJqq-27oG27FE1; raygun4js-userid=3066515a-140a-e666-9264-d6ea2bfd7ae3; ASPSESSIONIDAERTCDRA=NLILOKJAEAJMPNBNNHCIADAM; ASPSESSIONIDCESSABSA=LNDDKODBFMAINAGOINGCHLBJ; ASPSESSIONIDAEQSDCTB=EBCPKNOBIEECINGNMNKNBIHP; ASPSESSIONIDCGRSAASB=LFBNKPDDOCPDIGOBGLABBOGH; ASPSESSIONIDCESSAAQC=KBPFBFKDDCOOCDLDJGOALLKD; _hp2_id.2986378716=%7B%22userId%22%3A%224953539807444690%22%2C%22pageviewId%22%3A%226542701704351161%22%2C%22sessionId%22%3A%228792086243492168%22%2C%22identity%22%3A%224c615d6b24e8414799aef9a8cd96c5b8%40vle.kings-school.co.uk%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _hp2_ses_props.2986378716=%7B%22ts%22%3A1541941365024%2C%22d%22%3A%22vle.kings-school.co.uk%22%2C%22h%22%3A%22%2F%22%7D; ASPSESSIONIDCEQTDAQC=NNMPIBBABEJFHJONHIPMMHHI; iSAMS=Key=13r2qrgx4pe&SPUserCode=JuszczakiewiczLewis200280408100160; SP%5FShared=SPSessionKey=13r2qrgx4pe&SPUserCode=JuszczakiewiczLewis200280408100160; iSAMSAuth=ACGFznM5VmncINKEvanquevqZ_8WRIfcVux9I6em1DpCEUkH6CtpeQ_jXEO4_FV-juc4sU3X0vyWS7t1e-1GuwuHEdCCa_jCPIa1sscKJGKmUvqxU8AMP0GI4lZqal6IKJpfIIHwQ2s4gqdDz_F2KwYS67ha_Sco4McrywTJO2Tp4G-1VetkVZFa3w82N32--Vd34L3Th6-Pq_ccmI-w50geOGpn9QPgu7ndohw0gqRLBENlASIEYq_UanTlBbLt7QvkcxjPHBP70AZ9AiGQ7JFjMzePciFdfPvTrY3t8pU");

    final_xhr.send(data);

    return new Promise((resolve, reject) => {
        final_xhr.onload = function(){
            var response = final_xhr.responseText;
            // const regex = /<[bB]ody>/gm;
            const regex = /<div class="SP_Page_Content">/gm;
            var body_start = response.search(regex);
            var html = "<html class='login'>";
            html += response.substr(body_start, response.length);

            var summary_div = /<div class="SP_Page_Content_Summary">[\s\S]*?<\/div>/gm;
            var print_div = /<table border="0" cellpadding="\d" cellspacing="\d">[\s\S]*?<\/table>/gm;
            var footer_div = /<div class="SP_Footer_Div">[\s\S]*?<\/div>/gm;
            var possible_extra_footer = /<div class="SP_Footer_Div_Updated">[\s\S]*?<\/div>/gm;
            var student_name_header = /<table class="TTB_Header_Information"[\s\S]*?>[\s\S]*?<\/table>/gm;
            html = html.replace(summary_div, "").replace(print_div, "").replace(footer_div, "").replace(possible_extra_footer, "").replace(student_name_header, ""); 
            
            // var root = new DomParser().parseFromString(html, 'text/html');
            // console.log(root.getElementsByClassName("TTB_Table")); 

            resolve(html);
        };
    });
};
