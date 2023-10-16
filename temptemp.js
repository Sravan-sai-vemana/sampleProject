db.collection('ClassData')
    .where("year","==",req.query.year)
    .where("branch","==",req.query.branch)
    .get().then((docs)=>{
        docs.forEach((doc) => {
            var key=req.query.regno;
            doc.ref.update({
                [req.query.regno] : "1",
              })


<tr>
                            <td colspan="2">
                                <center>
                                    <p class="block">Message sent successfully</p>
                                </center>
                            </td>
                        </tr>