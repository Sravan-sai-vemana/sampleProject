function FirstBlock(){
    db.collection('ClassData')
    .where("year","==",req.query.year)
    .where("branch","==",req.query.branch)
    .get().then((docs)=>{
        docs.forEach((doc)=>{
            for(var i=0;i<doc.data().count;i++)
            {
                doc.ref.update({
                    [doc.data()[doc.data()[i]]] : "0"
                })
            }
        })
    })
}


function SecondBlock() {
        
    db.collection('PermissionData')
    .where("year","==",req.query.year)
    .where("branch","==",req.query.branch)
    .get().then((docs)=>{
    docs.forEach((doc)=> {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        if((doc.data().from <= formattedDate)&&(doc.data().to >=formattedDate))
        {
            db.collection('ClassData')
            .where("year","==",req.query.year)
            .where("branch","==",req.query.branch)
            .get().then((indocs)=>{
                indocs.forEach((indoc) => {
                    var value=indoc.data()[doc.data().regno];
                    if((value=="0")||(value=="-1"))
                    {
                        value=doc.data().Gval;
                    }
                    else if(value=="1")
                    {
                        if((doc.data().Gval == "2")||(doc.data().Gval == "3"))
                        {
                            value="3"
                        }
                    }
                    else if(value=="2")
                    {
                        if((doc.data().Gval == "1")||(doc.data().Gval == "3"))
                        {
                            value="3"
                        }
                    }
                    indoc.ref.update({
                        [doc.data().regno] : value,
                })
                })
            })
        }
        else if(doc.data().to<formattedDate)
        {
            db.collection('ClassData')
            .where("year","==",req.query.year)
            .where("branch","==",req.query.branch)
            .get().then((indocs)=>{
                indocs.forEach((indoc) => {
                    indoc.ref.update({
                        [doc.data().regno] : "0",
                    })
                })
            })
            doc.ref.delete();
        }
    })
})
}
  
function ThirdBlock() {
    
    db.collection('ClassData')
    .where("year","==",req.query.year)
    .where("branch","==",req.query.branch)
    .get().then((docs)=>{
        docs.forEach((doc) => {
        var temp="";
        var j="";
        for(var i=0;i<doc.data().count;i++)
        {
            if(i%5==0)
            {
                temp=temp+'</tr><tr>';
            }
            j=doc.data()[i];
            if((doc.data()[j]==0)||(doc.data()[j]==-1))
            {
                temp=temp+'<td>'+j+'</td>';
            }
            else if(doc.data()[j]==1)
            {
                temp=temp+'<td class="G">'+j+'</td>'
            }
            else if(doc.data()[j]==2)
            {
                temp=temp+'<td class="B">'+j+'</td>'
            }
            else if(doc.data()[j]==3)
            {
                temp=temp+'<td class="Y">'+j+'</td>'
            } 
        }
            res.send('<!DOCTYPE html> <html> <head> <style> ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333; position: -webkit-sticky; position: sticky; top: 0; } li { float: left; } li .nb { border: none; background: none; text-decoration: none; display: block; color: white; text-align: center; padding: 14px 16px; } li .nb:hover { background-color: #111; } #active { background-color: #4CAF50; } #tab{ background-color: #333; padding: 0.7cm; border-spacing: 0.25cm; border-radius: 0.5cm; font-size: 0.7cm; } td{ background-color: white; color: #333; border-radius: 4px; width: 80px; padding: 10px; } th{ background-color: #4CAF50; padding: 0.7cm; border-spacing: 0.25cm; border-radius: 0.5cm; font-size: 0.7cm; color: white; } #PG{ width: 1cm; height: 1cm; background-color: #4CAF50; float: left; } #signal{ float: right; } #GS{ width: 1cm; height: 1cm; background-color: #4CAF50; } #YS{ width: 1cm; height: 1cm; background-color: yellow; } #BS{ width: 1cm; height: 1cm; background-color: blue; } .G{ background-color: #4CAF50; } .B{ background-color: blue; } .Y{ background-color: yellow; } #hide{ display: none; } #logout{ float: right; } </style> </head> <body> <ul> <li> <form action="/student_class_info" method="get"> <div id="hide"> <input type="text" name="inuser" value="'+req.query.inuser+'"> </div> <button type="submit" class="nb">Home</button> </form> </li> <li> <form action="/message" method="get"> <div id="hide"> <input type="text" name="inuser" value="'+req.query.inuser+'"> </div> <button type="submit" class="nb">Message</button> </form> </li> <li> <form action="/approvals" method="get"> <div id="hide"> <input type="text" name="inuser" value="'+req.query.inuser+'"> </div> <button type="submit" class="nb">Approvals</button> </form> </li> <li id="logout"> <form action="/logout" method="get"> <button type="submit" class="nb">Log out</button> </form> </li> </ul> <div> <center> <table> <tr> <th>'+req.query.year+'-year/'+req.query.branch+'</td> </tr> </table> </center> <div id="signal"> <table> <tr> <td> <div id="GS"></div> </td> <td> Attendance Granted </td> </tr> <tr> <td> <div id="BS"></div> </td> <td> Outing Granted </td> </tr> <tr> <td> <div id="YS"></div> </td> <td> Attendance & Outing Granted </td> </tr> </table> </div> <center> <table id="tab"> <tr> '+temp+' </tr> </table> </center> </div> </body> </html> ');    
        })
    })
}
FirstBlock();
setTimeout(() => {
    SecondBlock();
}, 1000);
setTimeout(() => {
  ThirdBlock();
}, 2500);