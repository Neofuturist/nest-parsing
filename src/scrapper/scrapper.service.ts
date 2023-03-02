import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer() {
    const URL = `https://www.google.com/search?q=test&sxsrf=AJOqlzXqxj9nNoDmuULvlb0bVxoqZHF4Aw%3A1677752265042&source=hp&ei=yXcAZJFrzbKuBOX6lfAC&iflsig=AK50M_UAAAAAZACF2Yigrl50aLBFWerEF7P9KMdt0pQm&ved=0ahUKEwjR85uegr39AhVNmYsKHWV9BS4Q4dUDCAc&uact=5&oq=test&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyCAgAEIAEELEDMgsILhCABBCxAxCDATIICAAQgAQQsQMyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATIOCC4QgAQQsQMQgwEQ1AIyCAgAEIAEELEDMgsIABCABBCxAxCDATIRCC4QgAQQsQMQgwEQxwEQ0QM6DgguEIAEELEDEMcBENEDOgsILhDUAhCxAxCABDoLCC4QgAQQsQMQ1AI6BQgAEIAEUABY_gJgogRoAHAAeACAAUCIAekBkgEBNJgBAKABAQ&sclient=gws-wiz`;
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });

    const results = await page.evaluate(() => {
      const propertyList = [];

      document
        .querySelectorAll(
          'html body#gsr.srp.EIlDfe div#main.main div#cnt.e9EfHf div#rcnt.GyAeWb div#center_col.s6JM6d div#res.eqAnXb div#search div div#rso.v7W49e div.MjjYud div.g.Ww4FFb.vt6azd.tF2Cxc.asEBEc div.kvH3mc.BToiNc.UK95Uc div.Z26q7c.UK95Uc.jGGQ5e div.yuRUbf a h3.LC20lb.MBeuO.DKV0Md',
        )
        .forEach((z) => {
          propertyList.push(z.textContent);
        });

      return propertyList;
    });

    console.log('getDataViaPuppeteer results :', results);
    await browser.close();
    return results;
  }
}

// await page.screenshot({ path: 'example.png' });
//
// await browser.close();
// return 'data';
