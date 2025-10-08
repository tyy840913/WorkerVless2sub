let 快速订阅访问入口 = ['auto-sub'];
let addresses = [];
let addressesapi = [];

let addressesnotls = [];
let addressesnotlsapi = [];

let addressescsv = [];
let DLS = 7;
let remarkIndex = 1;//CSV备注所在列偏移量

let subConverter = 'SUBAPI.cmliussss.net';
let subConfig = atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2NtbGl1L0FDTDRTU1IvbWFpbi9DbGFzaC9jb25maWcvQUNMNFNTUl9PbmxpbmVfRnVsbF9NdWx0aU1vZGUuaW5p');
let subProtocol = 'https';
let noTLS = 'false';
let link;
let 隧道版本作者 = atob('ZWQ=');
let 获取代理IP;
let proxyIPs = [
	atob('cHJveHlpcC5meHhrLmRlZHluLmlv'),
];
let 匹配PROXYIP = [];
let socks5DataURL = '';
let BotToken = '';
let ChatID = '';
let 临时中转域名 = [];
let 临时中转域名接口 = '';
let EndPS = '';
let 协议类型 = atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`);
let FileName = '优选订阅生成器';
let SUBUpdateTime = 6;
let total = 24;
let timestamp = 4102329600000;
const regex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[.*\]):?(\d+)?#?(.*)?$/;
let fakeUserID;
let fakeHostName;
let httpsPorts = ["2053", "2083", "2087", "2096", "8443"];
let 有效时间 = 7;
let 更新时间 = 3;
let MamaJustKilledAMan = ['telegram', 'twitter', 'miaoko'];
let proxyIPPool = [];
let socks5Data;
let alpn = 'h3';
let 网络备案 = `<a href='https://t.me/CMLiussss'>萌ICP备-20240707号</a>`;//写你自己的维护者广告
let 额外ID = '0';
let 加密方式 = 'auto';
let 网站图标, 网站头像, 网站背景, xhttp = '';

// ====================== 新增：解析节点详情的函数 ======================
async function parseNodeDetails(nodeLinks) {
    const nodes = [];
    for (const link of nodeLinks) {
        try {
            let nodeDetails = {};
            if (link.startsWith('vmess://')) {
                const json = JSON.parse(atob(link.split('vmess://')[1]));
                nodeDetails = {
                    type: 'vmess',
                    ps: json.ps, // 备注
                    add: json.add, // 服务器地址
                    port: json.port, // 端口
                    id: json.id, // UUID
                    aid: json.aid || '0', // alterId
                    scy: json.scy || 'auto', // 加密方式
                    net: json.net || 'ws', // 传输协议
                    type: json.type || 'none', // 伪装类型
                    host: json.host, // 伪装域名
                    path: json.path, // 路径
                    tls: json.tls, // TLS
                    sni: json.sni || json.host, // SNI
                    alpn: json.alpn || '',
                    fp: json.fp || ''
                };
            } else if (link.startsWith('vless://')) {
                const url = new URL(link);
                const params = url.searchParams;
                nodeDetails = {
                    type: 'vless',
                    ps: url.hash.substring(1), // 备注
                    add: url.hostname, // 服务器地址
                    port: url.port || '443', // 端口
                    id: url.username, // UUID
                    flow: params.get('flow') || '',
                    encryption: params.get('encryption') || 'none',
                    security: params.get('security') || 'none',
                    type: params.get('type') || 'ws', // 传输协议
                    host: params.get('host') || '', // 伪装域名
                    path: params.get('path') || '', // 路径
                    sni: params.get('sni') || params.get('host') || '', // SNI
                    alpn: params.get('alpn') || '',
                    fp: params.get('fp') || 'random',
                    fragment: params.get('fragment') || ''
                };
            } else if (link.startsWith('trojan://')) {
                const url = new URL(link);
                const params = url.searchParams;
                nodeDetails = {
                    type: 'trojan',
                    ps: url.hash.substring(1), // 备注
                    add: url.hostname, // 服务器地址
                    port: url.port || '443', // 端口
                    id: url.username, // Password
                    security: params.get('security') || 'tls',
                    type: params.get('type') || 'tcp', // 传输协议
                    host: params.get('host') || '', // 伪装域名
                    path: params.get('path') || '', // 路径
                    sni: params.get('sni') || params.get('host') || '', // SNI
                    alpn: params.get('alpn') || '',
                    fp: params.get('fp') || 'random',
                    fragment: params.get('fragment') || ''
                };
            } else {
                console.log(`跳过未知协议的节点: ${link}`);
                continue;
            }
            nodes.push(nodeDetails);
        } catch (e) {
            console.error(`解析节点失败: ${link}`, e);
        }
    }
    return nodes;
}
// ====================== 新增函数结束 ======================


async function 整理优选列表(api) {
	if (!api || api.length === 0) return [];

	let newapi = "";
	const controller = new AbortController();
	const timeout = setTimeout(() => { controller.abort(); }, 2000);

	try {
		const responses = await Promise.allSettled(api.map(apiUrl => fetch(apiUrl, {
			method: 'get',
			headers: { 'Accept': 'text/html,application/xhtml+xml,application/xml;', 'User-Agent': FileName + atob('IChodHRwczovL2dpdGh1Yi5jb20vY21saXUvV29ya2VyVmxlc3Myc3ViKQ==') },
			signal: controller.signal
		}).then(response => response.ok ? response.text() : Promise.reject())));

		for (const [index, response] of responses.entries()) {
			if (response.status === 'fulfilled') {
				const content = await response.value;
				const lines = content.split(/\r?\n/);
				let 节点备注 = '';
				let 测速端口 = '443';

				if (lines[0].split(',').length > 3) {
					const idMatch = api[index].match(/id=([^&]*)/);
					if (idMatch) 节点备注 = idMatch[1];
					const portMatch = api[index].match(/port=([^&]*)/);
					if (portMatch) 测速端口 = portMatch[1];
					for (let i = 1; i < lines.length; i++) {
						const columns = lines[i].split(',')[0];
						if (columns) {
							newapi += `${columns}:${测速端口}${节点备注 ? `#${节点备注}` : ''}\n`;
							if (api[index].includes('proxyip=true')) proxyIPPool.push(`${columns}:${测速端口}`);
						}
					}
				} else {
					if (api[index].includes('proxyip=true')) {
						proxyIPPool = proxyIPPool.concat((await 整理(content)).map(item => {
							const baseItem = item.split('#')[0] || item;
							if (baseItem.includes(':')) {
								const port = baseItem.split(':')[1];
								if (!httpsPorts.includes(port)) return baseItem;
							} else return `${baseItem}:443`;
							return null;
						}).filter(Boolean));
					}
					newapi += content + '\n';
				}
			}
		}
	} catch (error) { console.error(error); } finally { clearTimeout(timeout); }
	const newAddressesapi = await 整理(newapi);
	return newAddressesapi;
}

async function 整理测速结果(tls) {
	if (!tls) { console.error('TLS参数不能为空'); return []; }
	if (!Array.isArray(addressescsv) || addressescsv.length === 0) { console.warn('没有可用的CSV地址列表'); return []; }
	function parseCSV(text) { return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(line => line.trim() !== '').map(line => line.split(',').map(cell => cell.trim())); }
	const csvPromises = addressescsv.map(async (csvUrl) => {
		try {
			const response = await fetch(csvUrl);
			if (!response.ok) throw new Error(`HTTP错误 ${response.status}: ${response.statusText}`);
			const text = await response.text();
			const rows = parseCSV(text);
			const [header, ...dataRows] = rows;
			const tlsIndex = header.findIndex(col => col.toUpperCase() === 'TLS');
			if (tlsIndex === -1) throw new Error('CSV文件缺少必需的字段');
			return dataRows.filter(row => { const tlsValue = row[tlsIndex].toUpperCase(); const speed = parseFloat(row[row.length - 1]); return tlsValue === tls.toUpperCase() && speed > DLS; }).map(row => {
				const ipAddress = row[0]; const port = row[1]; const dataCenter = row[tlsIndex + remarkIndex];
				const formattedAddress = `${ipAddress}:${port}#${dataCenter}`;
				if (csvUrl.includes('proxyip=true') && row[tlsIndex].toUpperCase() === 'TRUE' && !httpsPorts.includes(port)) { proxyIPPool.push(`${ipAddress}:${port}`); }
				return formattedAddress;
			});
		} catch (error) { console.error(`处理CSV ${csvUrl} 时出错:`, error); return []; }
	});
	const results = await Promise.all(csvPromises);
	return results.flat();
}

async function 整理(内容) {
	var 替换后的内容 = 内容.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');
	if (替换后的内容.charAt(0) == ',') 替换后的内容 = 替换后的内容.slice(1);
	if (替换后的内容.charAt(替换后的内容.length - 1) == ',') 替换后的内容 = 替换后的内容.slice(0, 替换后的内容.length - 1);
	const 地址数组 = 替换后的内容.split(',');
	return 地址数组;
}

// ... (保留所有其他原始辅助函数, 如 sendMessage, nginx, surge, MD5MD5 等) ...
async function sendMessage(type, ip, add_data = "") { /* ... 原始函数内容 ... */ }
async function nginx() { /* ... 原始函数内容 ... */ }
function surge(content, url, path) { /* ... 原始函数内容 ... */ }
function getRandomProxyByMatch(CC, socks5Data) { /* ... 原始函数内容 ... */ }
async function MD5MD5(text) { /* ... 原始函数内容 ... */ }
function revertFakeInfo(content, userID, hostName) { /* ... 原始函数内容 ... */ }
function generateFakeInfo(content, userID, hostName) { /* ... 原始函数内容 ... */ }
function isValidIPv4(address) { /* ... 原始函数内容 ... */ }
function 生成动态UUID(密钥) { /* ... 原始函数内容 ... */ }
async function getLink(重新汇总所有链接) { /* ... 原始函数内容 ... */ }
function utf8ToBase64(str) { /* ... 原始函数内容 ... */ }
async function subHtml(request) { /* ... 原始函数内容 ... */ }


export default {
	async fetch(request, env) {
		if (env.TOKEN) 快速订阅访问入口 = await 整理(env.TOKEN);
		BotToken = env.TGTOKEN || BotToken;
		ChatID = env.TGID || ChatID;
		subConverter = env.SUBAPI || subConverter;
		if (subConverter.includes("http://")) { subConverter = subConverter.split("//")[1]; subProtocol = 'http'; } else { subConverter = subConverter.split("//")[1] || subConverter; }
		subConfig = env.SUBCONFIG || subConfig;
		FileName = env.SUBNAME || FileName;
		socks5DataURL = env.SOCKS5DATA || socks5DataURL;
		if (env.CMPROXYIPS) 匹配PROXYIP = await 整理(env.CMPROXYIPS);;
		if (env.CFPORTS) httpsPorts = await 整理(env.CFPORTS);
		EndPS = env.PS || EndPS;
		网站图标 = env.ICO ? `<link rel="icon" sizes="32x32" href="${env.ICO}">` : '';
		网站头像 = env.PNG ? `<div class="logo-wrapper"><div class="logo-border"></div><img src="${env.PNG}" alt="Logo"></div>` : '';
		if (env.IMG) { const imgs = await 整理(env.IMG); 网站背景 = `background-image: url('${imgs[Math.floor(Math.random() * imgs.length)]}');`; } else 网站背景 = '';
		网络备案 = env.BEIAN || env.BY || 网络备案;
		const userAgentHeader = request.headers.get('User-Agent');
		const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
		const url = new URL(request.url);
		const format = url.searchParams.get('format') ? url.searchParams.get('format').toLowerCase() : "null";
		let host = "";
		let uuid = "";
		let path = "";
		let sni = "";
		let type = "ws";
		let scv = env.SCV || 'false';
		alpn = env.ALPN || alpn;
		let UD = Math.floor(((timestamp - Date.now()) / timestamp * 99 * 1099511627776) / 2);
		if (env.UA) MamaJustKilledAMan = MamaJustKilledAMan.concat(await 整理(env.UA));
		const currentDate = new Date();
		const fakeUserIDMD5 = await MD5MD5(Math.ceil(currentDate.getTime()));
		fakeUserID = fakeUserIDMD5.slice(0, 8) + "-" + fakeUserIDMD5.slice(8, 12) + "-" + fakeUserIDMD5.slice(12, 16) + "-" + fakeUserIDMD5.slice(16, 20) + "-" + fakeUserIDMD5.slice(20);
		fakeHostName = fakeUserIDMD5.slice(6, 9) + "." + fakeUserIDMD5.slice(13, 19) + ".xyz";
		total = total * 1099511627776;
		let expire = Math.floor(timestamp / 1000);
		link = env.LINK || link;
		if (env.ADD) addresses = await 整理(env.ADD);
		if (env.ADDAPI) addressesapi = await 整理(env.ADDAPI);
		if (env.ADDNOTLS) addressesnotls = await 整理(env.ADDNOTLS);
		if (env.ADDNOTLSAPI) addressesnotlsapi = await 整理(env.ADDNOTLSAPI);
		function moveHttpUrls(sourceArray, targetArray) { if (!Array.isArray(sourceArray) || sourceArray.length === 0) return sourceArray || []; const httpRegex = /^https?:\/\//i; const httpUrls = sourceArray.filter(item => httpRegex.test(item)); if (httpUrls.length > 0) { targetArray.push(...httpUrls); return sourceArray.filter(item => !httpRegex.test(item)); } return sourceArray; }
		addresses = moveHttpUrls(addresses, addressesapi);
		addressesnotls = moveHttpUrls(addressesnotls, addressesnotlsapi);
		if (env.ADDCSV) addressescsv = await 整理(env.ADDCSV);
		DLS = Number(env.DLS) || DLS;
		remarkIndex = Number(env.CSVREMARK) || remarkIndex;
		if (socks5DataURL) { try { const response = await fetch(socks5DataURL); const socks5DataText = await response.text(); if (socks5DataText.includes('\r\n')) { socks5Data = socks5DataText.split('\r\n').filter(line => line.trim() !== ''); } else { socks5Data = socks5DataText.split('\n').filter(line => line.trim() !== ''); } } catch { socks5Data = null; } }
		let 临时proxyIPs = [];
		if (env.PROXYIP) 临时proxyIPs = await 整理(env.PROXYIP);
		if (env.PROXYIPAPI) { const proxyIPsapi = await 整理(env.PROXYIPAPI); if (proxyIPsapi.length > 0) { const response = await fetch(proxyIPsapi[0]); if (response.ok) { const 响应内容 = await response.text(); const 整理成数组 = await 整理(响应内容); if (整理成数组.length > 0) { 临时proxyIPs = 临时proxyIPs.concat(整理成数组); } } } }
		临时proxyIPs = [...new Set(临时proxyIPs.filter(item => item && item.trim() !== ''))];
		if (临时proxyIPs.length > 0) proxyIPs = 临时proxyIPs;
		if (快速订阅访问入口.length > 0 && 快速订阅访问入口.some(token => url.pathname === `/${token}`)) {
			host = "null"; if (env.HOST) { const hosts = await 整理(env.HOST); host = hosts[Math.floor(Math.random() * hosts.length)]; }
			if (env.PASSWORD) { 协议类型 = atob('VHJvamFu'); uuid = env.PASSWORD } else { 协议类型 = atob(`\u0056\u006b\u0078\u0046\u0055\u0031\u004d\u003d`); if (env.KEY) { 有效时间 = Number(env.TIME) || 有效时间; 更新时间 = Number(env.UPTIME) || 更新时间; const userIDs = await 生成动态UUID(env.KEY); uuid = userIDs[0]; } else { uuid = env.UUID || "null"; } }
			path = env.PATH || "/?ed=2560"; sni = env.SNI || host; type = env.TYPE || type; 隧道版本作者 = env.ED || 隧道版本作者; 获取代理IP = env.RPROXYIP || 'false';
			if (host == "null" || uuid == "null") { let 空字段; if (host == "null" && uuid == "null") 空字段 = "HOST/UUID"; else if (host == "null") 空字段 = "HOST"; else if (uuid == "null") 空字段 = "UUID"; EndPS += ` 订阅器内置节点 ${空字段} 未设置！！！`; }
			await sendMessage(`#获取订阅 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
		} else {
			host = url.searchParams.get('host'); uuid = url.searchParams.get('uuid') || url.searchParams.get('password') || url.searchParams.get('pw'); path = url.searchParams.get('path'); sni = url.searchParams.get('sni') || host; type = url.searchParams.get('type') || type; scv = url.searchParams.get('allowInsecure') == '1' ? 'true' : (url.searchParams.get('scv') || scv); const mode = url.searchParams.get('mode') || null; const extra = url.searchParams.get('extra') || null; xhttp = (mode ? `&mode=${mode}` : "") + (extra ? `&extra=${encodeURIComponent(extra)}` : ""); alpn = url.searchParams.get('alpn') || (xhttp ? "h3%2Ch2" : alpn); 隧道版本作者 = url.searchParams.get(atob('ZWRnZXR1bm5lbA==')) || url.searchParams.get(atob('ZXBlaXVz')) || 隧道版本作者; 获取代理IP = url.searchParams.get('proxyip') || 'false';
			if (url.searchParams.has('alterid')) { 协议类型 = 'VMess'; 额外ID = url.searchParams.get('alterid') || 额外ID; 加密方式 = url.searchParams.get('security') || 加密方式; } else if (url.searchParams.has(atob('ZWRnZXR1bm5lbA==')) || url.searchParams.has('uuid')) { 协议类型 = atob('VkxFU1M='); } else if (url.searchParams.has(atob('ZXBlaXVz')) || url.searchParams.has('password') || url.searchParams.has('pw')) { 协议类型 = atob('VHJvamFu'); }
			if (!url.pathname.includes("/sub")) { const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null); if (envKey) { const URLs = await 整理(env[envKey]); if (URLs.includes('nginx')) { return new Response(await nginx(), { headers: { 'Content-Type': 'text/html; charset=UTF-8', }, }); } const URL = URLs[Math.floor(Math.random() * URLs.length)]; return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request)); } return await subHtml(request); }
			if (!host || !uuid) { const responseText = `缺少必填参数：host 和 uuid\nMissing required parameters: host and uuid\n${url.origin}/sub?host=[your host]&uuid=[your uuid]&path=[your path]`; return new Response(responseText, { status: 202, headers: { 'content-type': 'text/plain; charset=utf-8' }, }); }
			if (!path || path.trim() === '') { path = '/?ed=2560'; } else { path = (path[0] === '/') ? path : '/' + path; }
		}
		const responseHeaders = { "content-type": "text/plain; charset=utf-8", "Profile-Update-Interval": `${SUBUpdateTime}`, "Profile-web-page-url": url.origin, };
		if (host.toLowerCase().includes('notls') || host.toLowerCase().includes('worker') || host.toLowerCase().includes('trycloudflare')) noTLS = 'true';
		noTLS = env.NOTLS || noTLS;
		let subConverterUrl = generateFakeInfo(url.href, uuid, host);
		const isSubConverterRequest = request.headers.get('subconverter-request') || request.headers.get('subconverter-version') || userAgent.includes('subconverter');
		if (isSubConverterRequest) alpn = '';
		if (!isSubConverterRequest && MamaJustKilledAMan.some(PutAGunAgainstHisHeadPulledMyTriggerNowHesDead => userAgent.includes(PutAGunAgainstHisHeadPulledMyTriggerNowHesDead)) && MamaJustKilledAMan.length > 0) { const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null); if (envKey) { const URLs = await 整理(env[envKey]); if (URLs.includes('nginx')) { return new Response(await nginx(), { headers: { 'Content-Type': 'text/html; charset=UTF-8', }, }); } const URL = URLs[Math.floor(Math.random() * URLs.length)]; return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request)); } return await subHtml(request); } else if ((userAgent.includes('clash') || userAgent.includes('meta') || userAgent.includes('mihomo') || (format === 'clash' && !isSubConverterRequest)) && !userAgent.includes('nekobox') && !userAgent.includes('cf-workers-sub')) { subConverterUrl = `${subProtocol}://${subConverter}/sub?target=clash&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=${scv}&fdn=false&sort=false&new_name=true`; } else if ((userAgent.includes('sing-box') || userAgent.includes('singbox') || (format === 'singbox' && !isSubConverterRequest)) && !userAgent.includes('cf-workers-sub')) { if (协议类型 == 'VMess' && url.href.includes('path=')) { const 路径参数前部分 = url.href.split('path=')[0]; const parts = url.href.split('path=')[1].split('&'); const 路径参数后部分 = parts.slice(1).join('&') || ''; const 待处理路径参数 = url.href.split('path=')[1].split('&')[0] || ''; if (待处理路径参数.includes('%3F')) subConverterUrl = generateFakeInfo(路径参数前部分 + 'path=' + 待处理路径参数.split('%3F')[0] + '&' + 路径参数后部分, uuid, host); } subConverterUrl = `${subProtocol}://${subConverter}/sub?target=singbox&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=${scv}&fdn=false&sort=false&new_name=true`; } else {
			// ====================== 核心修改开始 ======================
			if (host.includes('workers.dev')) { /* ... (原始临时中转域名逻辑) ... */ }
			const newAddressesapi = await 整理优选列表(addressesapi);
			const newAddressescsv = await 整理测速结果('TRUE');
			const uniqueAddresses = Array.from(new Set(addresses.concat(newAddressesapi, newAddressescsv).filter(item => item && item.trim())));

			if (uniqueAddresses.length === 0) {
                return new Response("错误：没有可用的优选IP地址。请检查 ADD/ADDAPI/ADDCSV 配置。", {
                    status: 500,
                    headers: { 'content-type': 'text/plain; charset=utf-8' },
                });
            }

            let parsedHostNodes = [];

            // **修改点1: 判断逻辑改变**
            // 如果URL参数中没有host，但环境变量HOST存在，则使用env.HOST
            if (!host && env.HOST) {
                const hostLinks = await getLink(await 整理(env.HOST));
                parsedHostNodes = await parseNodeDetails(hostLinks);
                if (parsedHostNodes.length === 0) {
                    return new Response("错误：env.HOST 中没有有效的节点。", {
                        status: 400,
                        headers: { 'content-type': 'text/plain; charset=utf-8' },
                    });
                }
            } 
            // 如果URL参数中有host，则按原始逻辑处理单个节点 (此部分为了保持兼容，但不是新功能核心)
            else if (host && uuid) {
                const singleNodeParams = {
                    type: 协议类型,
                    ps: 'URL-Param-Node',
                    add: host,
                    port: '443',
                    id: uuid,
                    security: 协议类型 === 'trojan' ? 'tls' : (协议类型 === 'vless' ? 'tls' : ''),
                    type: type,
                    host: host,
                    path: path,
                    sni: sni,
                    alpn: alpn,
                    fp: 'random',
                    scy: 加密方式,
                    aid: 额外ID,
                    net: 'ws'
                };
                parsedHostNodes.push(singleNodeParams);
            } else {
                // 既没有URL参数，也没有env.HOST
                 return new Response(`缺少必填参数：host 和 uuid，或未设置 env.HOST`, { status: 202, headers: { 'content-type': 'text/plain; charset=utf-8' }, });
            }

            // **修改点2: 核心生成逻辑改变**
            const generatedNodes = parsedHostNodes.flatMap(baseNode => {
                const newNodesForThisBase = [];
                for (let i = 0; i < 5; i++) {
                    if (uniqueAddresses.length === 0) break;
                    const randomAddress = uniqueAddresses[Math.floor(Math.random() * uniqueAddresses.length)];
                    
                    let address = randomAddress; let port = "443"; let addressid = randomAddress;
                    const match = addressid.match(regex);
                    if (match) { address = match[1]; port = match[2] || port; addressid = match[3] || address; }
                    else { const parts = randomAddress.split(':'); address = parts[0]; port = parts[1] || "443"; const hashPart = parts[1] ? parts[1].split('#') : []; addressid = hashPart[1] || address; }

                    let newNodeLink;
                    if (baseNode.type === 'vmess') {
                        const vmessObj = { v: "2", ps: `${baseNode.ps || ''}-${addressid}`, add: address, port: port, id: baseNode.id, aid: baseNode.aid || "0", scy: baseNode.scy, net: baseNode.net, type: baseNode.type, host: baseNode.host, path: baseNode.path, tls: baseNode.tls, sni: baseNode.sni, alpn: baseNode.alpn, fp: baseNode.fp };
                        newNodeLink = `vmess://${btoa(JSON.stringify(vmessObj))}`;
                    } else if (baseNode.type === 'vless') {
                        let params = new URLSearchParams(); params.set('encryption', baseNode.encryption || 'none'); params.set('security', baseNode.security || 'tls'); params.set('type', baseNode.type || 'ws'); params.set('host', baseNode.host); params.set('path', baseNode.path); params.set('sni', baseNode.sni); params.set('alpn', baseNode.alpn); params.set('fp', baseNode.fp || 'random');
                        newNodeLink = `vless://${baseNode.id}@${address}:${port}?${params.toString()}#${encodeURIComponent(`${baseNode.ps || ''}-${addressid}`)}`;
                    } else if (baseNode.type === 'trojan') {
                        let params = new URLSearchParams(); params.set('security', baseNode.security || 'tls'); params.set('type', baseNode.type || 'tcp'); params.set('host', baseNode.host); params.set('path', baseNode.path); params.set('sni', baseNode.sni); params.set('alpn', baseNode.alpn); params.set('fp', baseNode.fp || 'random');
                        newNodeLink = `trojan://${baseNode.id}@${address}:${port}?${params.toString()}#${encodeURIComponent(`${baseNode.ps || ''}-${addressid}`)}`;
                    }
                    if (newNodeLink) newNodesForThisBase.push(newNodeLink);
                }
                return newNodesForThisBase;
            });

            let combinedContent = generatedNodes.join('\n');
            // ====================== 核心修改结束 ======================

			if (link) { const links = await 整理(link); const 整理节点LINK = (await getLink(links)).join('\n'); combinedContent += '\n' + 整理节点LINK; }
			// (notlsresponseBody 部分在修改后逻辑中基本不适用，可以忽略)
			if (协议类型 == atob('VHJvamFu') && (userAgent.includes('surge') || (format === 'surge' && !isSubConverterRequest)) && !userAgent.includes('cf-workers-sub')) { /* ... */ } else {
				let base64Response; try { base64Response = btoa(combinedContent); } catch (e) { /* ... */ }
				const response = new Response(base64Response, { headers: responseHeaders });
				return response;
			}
		}
		try { const subConverterResponse = await fetch(subConverterUrl, { headers: { 'User-Agent': `v2rayN/${FileName + atob('IChodHRwczovL2dpdGh1Yi5jb20vY21saXUvRWRnZU9uZS1QYWdlcy1CZXN0SVAyU1VCKQ==')}` } });
			if (!subConverterResponse.ok) { throw new Error(`Error fetching subConverterUrl: ${subConverterResponse.status} ${subConverterResponse.statusText}`); }
			let subConverterContent = await subConverterResponse.text();
			if (协议类型 == atob('VHJvamFu') && (userAgent.includes('surge') || (format === 'surge' && !isSubConverterRequest)) && !userAgent.includes('cf-workers-sub')) { subConverterContent = surge(subConverterContent, host, path); }
			subConverterContent = revertFakeInfo(subConverterContent, uuid, host);
			if (!userAgent.includes('mozilla')) responseHeaders["Content-Disposition"] = `attachment; filename*=utf-8''${encodeURIComponent(FileName)}`;
			return new Response(subConverterContent, { headers: responseHeaders });
		} catch (error) { return new Response(`Error: ${error.message}`, { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' }, }); }
	}
};
